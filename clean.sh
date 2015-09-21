#!/bin/bash
docker stop $(docker ps -q)
docker rmi -f talreg/multy
docker build -t talreg/multy .
docker run -d -p 10000:3000 talreg/multy
