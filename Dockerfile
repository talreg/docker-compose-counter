FROM ubuntu:14.04
RUN sudo apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup | sudo bash
RUN sudo apt-get install -y nodejs
RUN sudo apt-get install redis-server -y
COPY . /src
RUN cd /src; npm install
EXPOSE 3000 6379
WORKDIR /src
CMD ["bash","run.sh"]
