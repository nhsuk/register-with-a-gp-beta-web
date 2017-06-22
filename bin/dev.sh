#!/bin/bash
docker-compose -p gp-reg -f docker-compose.yml  down -v
docker-compose -p gp-reg -f docker-compose.yml  up --build --force-recreate