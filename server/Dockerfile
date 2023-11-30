FROM node:20-alpine3.17

RUN adduser -D dev

USER root

WORKDIR /home/dev

COPY ./package.json .

RUN npm install

COPY . .

ENV ACCESS_TOKEN_SECRET 23111974M1
ENV REFRESH_TOKEN_SECRET 09111971F2

RUN npm run build

RUN rm -f Dockerfile && rm -f tsconfig.json

RUN rm -Rf ./src

EXPOSE 3000

USER dev

CMD ["node","./dist/src/server.js"]