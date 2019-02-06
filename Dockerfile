FROM node:alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install && npm install -g nodemon

EXPOSE 8000

COPY . /app

CMD ["npm","start"]
