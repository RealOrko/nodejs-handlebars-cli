FROM ubuntu
WORKDIR /
RUN set -x \
    export DEBIAN_FRONTEND=noninteractive && \
    apt-get update -y && \
    apt-get install curl -y && \
    apt-get install git -y && \
    curl -sL https://deb.nodesource.com/setup_15.x | bash - && \
    apt-get install -y nodejs && \
    git clone https://github.com/RealOrko/nodejs-handlebars-cli.git && \
    cd nodejs-handlebars-cli && \
    npm install . -g && \
    echo "Done!"
CMD ["/bin/bash"]
