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
        registryCredential = "docker_hub_akaytatsu_novo"
        dockerImageName = ""
        buildNumberFixed = currentBuild.number
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
                    withCredentials([usernamePassword( credentialsId: registryCredential, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {

                        sh "docker login -u ${USERNAME} -p ${PASSWORD}"

                        // docker.withRegistry("https://$registry", registryCredential) {
                        dockerImageName = "akaytatsu/iec-fin-front"
                        dockerImage = docker.build(dockerImageName, "-f Dockerfile-prd .")
                        dockerImage.push("$BUILD_NUMBER")
                        dockerImage.push("latest")
                        // }
                    }
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
                        sh 'cd /home/ubuntu/chrpo/iec_fin_front && deploy.sh ' + "$BUILD_NUMBER"
                    }
                }
            }

        }

    }
}
