FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY public public
COPY main.js main.js
COPY .gitignore .gitignore
COPY index.html index.html

RUN npm install

ENTRYPOINT ["node", "main.js"]
