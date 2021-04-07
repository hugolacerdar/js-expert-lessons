sudo docker run \
    --name postgres \
    -e POSTGRES_USER=hugolacerda \
    -e POSTGRES_PASSWORD="123456" \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

sudo docker logs postgres
sudo docker exec -it postgres psql --username hugolacerda --dbname heroes

CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR(255) NOT NULL);
SELECT * FROM warriors;

# mongodb

sudo docker run \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=hugolacerda \
    -e MONGO_INITDB_ROOT_PASSWORD='123456' \
    -p 27017:27017 \
    -d \
    mongo:4

sudo docker logs mongodb
