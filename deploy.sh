git pull
sudo docker stop $(sudo docker ps | grep "akaytatsu/iec-fin-front" | cut -d " " -f 1)
docker run -d -p 7054:80 akaytatsu/iec-fin-front:'$1'