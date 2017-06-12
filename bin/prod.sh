#!/usr/bin/env bash
docker-compose -p gp-reg -f docker-compose.yml -f docker-compose.prod.yml down -v
docker-compose -p gp-reg -f docker-compose.yml -f docker-compose.prod.yml up --build --force-recreate "$@"