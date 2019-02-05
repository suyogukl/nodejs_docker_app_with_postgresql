FROM node:alpine

WORKDIR /app

COPY ./package.json ./package.json

RUN npm install && npm install -g nodemon

COPY . /app

CMD ["npm","start"]
