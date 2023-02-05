docker-compose -f docker-compose.prod.yml stop
docker-compose -f docker-compose.prod.yml down
cat docker-compose.yml | sed 's/{{BUILD_NUMBER}}/$1/g' | docker-compose up -d