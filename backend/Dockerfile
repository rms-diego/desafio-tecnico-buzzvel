FROM node:alpine3.17

WORKDIR /app

COPY . .

RUN npm install && npm run build

ENTRYPOINT [ "npm", "start" ]