#!/bin/bash
local=/renderws/carltonData/cj2023/code/consulting-ninja/express-mongo-svelte/db_data/mongo/

if [[ ! -d $local ]]
then
  echo "Directory does not exist => $local"
  exit -1
fi

docker run -d --rm \
  -p 27017:27017 \
	--name local-mongo \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=mysecretpassword \
	-v $local:/data/db \
	mongo:6.0-jammy
