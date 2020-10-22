FROM ubuntu
WORKDIR /app
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get update -y
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install -y nodejs
COPY . .
RUN npm install . -g
