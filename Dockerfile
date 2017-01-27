FROM node:4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

ENTRYPOINT ["npm", "start"]
EXPOSE 4000
