FROM node:16-alpine AS build
WORKDIR /app

COPY package*.json ./


RUN npm install

COPY . .

RUN ng run build

EXPOSE 4200

CMD ["npm", "start"]