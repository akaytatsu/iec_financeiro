@NonCPS
def cancelPreviousBuilds() {
  String jobname = env.JOB_NAME
  int currentBuildNum = env.BUILD_NUMBER.toInteger()

  def job = Jenkins.instance.getItemByFullName(jobname)
//   print('jobname: ' + jobname)
  for (build in job.builds) {
    //   print('build.getNumber(): ' + build.getNumber())

    if (build.isBuilding() && currentBuildNum > build.getNumber().toInteger()) {
      build.doStop();
      echo "Build ${build.toString()} cancelled"
    }
  }
}

pipeline {

    environment {
        registry = "hub.docker.com/r"
        dockerImageName = ""
    }

    agent {
        docker {
            image "akaytatsu/cibuilder:1.2.17"
        }
    }

    stages {

        stage('Init') {
            steps {
                cancelPreviousBuilds()
            }
        }

        stage('Code Checkout') {
            steps {
                checkout scm
            }
        }

        stage('build Container Register Production') {
            when {
                expression {
                    return env.GIT_BRANCH == 'master'
                }
            }

            steps {
                script {
                    docker.withRegistry("https://$registry", registryCredential) {
                        dockerImageName = "akaytatsu/gocusign"
                        dockerImage = docker.build(dockerImageName, "-f Dockerfile-prd .")
                        dockerImage.push("$BUILD_NUMBER")
                        dockerImage.push("latest")
                    }
                }

                script{
                    sh "docker rmi $registry/$dockerImageName:$BUILD_NUMBER"
                    sh "docker rmi $registry/$dockerImageName:latest"
                }
            }
        }

        stage('Deploy to Production Environment') {
            when {
                expression {
                    return env.GIT_BRANCH == 'master'
                }
            }

            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: "SSH_TAPBUSS", keyFileVariable: 'key')]) {
                        sh 'ssh -i $key ubuntu@34.197.229.243 -o StrictHostKeyChecking=no \"cd /home/ubuntu/chrpo/iec_fin_front && docker-compose -f docker-compose.prod.yml stop\"'
                        sh 'ssh -i $key ubuntu@34.197.229.243 -o StrictHostKeyChecking=no \cd /home/ubuntu/chrpo/iec_fin_front && docker-compose -f docker-compose.prod.yml down\"'
                        sh 'ssh -i $key ubuntu@34.197.229.243 -o StrictHostKeyChecking=no \"cd /home/ubuntu/chrpo/iec_fin_front && cat docker-compose.yml | sed 's/{{BUILD_NUMBER}}/$BUILD_NUMBER/g' | docker-compose up -d\"'
                    }
                }
            }

        }

    }

    post {
        always {
            echo "Stop Docker image"
            script{
                sh 'docker-compose -f docker-compose.yml -f docker-compose.tests.yml down'
            }
        }

        success {
            echo "Notify bitbucket success"
            script {
                sh 'docker-compose -f docker-compose.yml -f docker-compose.tests.yml down'
            }
        }

        failure {
            echo "Notify bitbucket failure"
            script {
                sh 'docker-compose -f docker-compose.yml -f docker-compose.tests.yml down'
            }
        }

        aborted {
            echo "Notify bitbucket failure"
            script {
                sh 'docker-compose -f docker-compose.yml -f docker-compose.tests.yml down'
            }
        }

        unsuccessful {
            echo "Notify bitbucket failure"
            script {
                sh 'docker-compose -f docker-compose.yml -f docker-compose.tests.yml down'
            }
        }

    }
}
