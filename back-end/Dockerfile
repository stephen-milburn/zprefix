FROM node:latest

WORKDIR /back-end

COPY . /back-end/

RUN yarn install

EXPOSE 8080

CMD ["npm", "start"]