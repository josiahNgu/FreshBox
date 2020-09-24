FROM node:latest


RUN mkdir -p /src

WORKDIR /src

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]