FROM ubuntu
WORKDIR /app
RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get update -y \
    && apt-get install curl -y \
    && curl -sL https://deb.nodesource.com/setup_15.x | bash - \
    && apt-get install -y nodejs \
    && apt install git -y
COPY . .
RUN npm install . -g
