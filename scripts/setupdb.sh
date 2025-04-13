: ' create new postgresql database using docker'

sudo docker run --name redtexdb \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=redtexdb \
  -p 5433:5433 \
  -d postgres
