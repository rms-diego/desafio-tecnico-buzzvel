FROM node:alpine3.17

WORKDIR /app

COPY . .

RUN npm install

ENTRYPOINT [ "npm", "run", "dev" ]