FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./dist ./

EXPOSE 3333


RUN npm install

CMD ["npm", "start"]