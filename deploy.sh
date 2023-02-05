echo $1

git pull
docker stop $(docker ps | grep "akaytatsu/iec-fin-front" | cut -d " " -f 1) || echo "No container to stop"
docker run -d -p 7054:80 akaytatsu/iec-fin-front:$1 || echo "Failed to start container"