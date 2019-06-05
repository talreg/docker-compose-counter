Overview
=============
This is a simple web app that display a counter every time a request is made.
it was created to test redis connection with node.
It will also show the `NODE_ENV` parameter for testing.
restarting the app will have no effect on the number of visitors, as it is stored in redis.

Requirements
=============
You'll need a redis server running on localhost.
You'll need nodejs express installed (version 10+).


Installing the app:
================
`npm install`

Running the app:
================
just run `npm start` inside the app directory after installing.
server will be listening on port 3000

About the files
----------------
Dockerfile is used to build a docker image.
docker compose is used to run full service with redis (and then you don't need to run redis).

Installing compose:
use this link: https://docs.docker.com/compose/
