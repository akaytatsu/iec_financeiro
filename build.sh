
#create var time and set it to the current time
time=`date +%s`

docker build -t iec-fin-front .

#tag the image with the current time
docker tag iec-fin-front akaytatsu/iec-fin-front:$time
docker tag iec-fin-front akaytatsu/iec-fin-front:latest

#push the image to docker hub
docker push akaytatsu/iec-fin-front:$time
docker push akaytatsu/iec-fin-front:latest
