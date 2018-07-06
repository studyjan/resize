#!/usr/bin/env bash

docker build -t p2p-nl-client . && docker run --rm --name p2p-nl-client --env-file .env -v ${PWD}/config/nginx.conf:/etc/nginx/nginx.conf -p 8085:80 p2p-nl-client
