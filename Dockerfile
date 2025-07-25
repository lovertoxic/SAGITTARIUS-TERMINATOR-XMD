FROM node:lts-buster

RUN git clone https://github.com/mejjar00254/Last-bot/root/JawadIK

WORKDIR /root/JawadIK

RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1

COPY . .

EXPOSE 9090

CMD ["npm", "start"]
