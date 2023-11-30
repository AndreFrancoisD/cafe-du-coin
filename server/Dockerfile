FROM node:20-alpine3.17

RUN adduser -D dev

USER root

WORKDIR /home/dev

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build && npm run doc:v1 

ENV ACCESS_TOKEN_SECRET 23111974M1
ENV REFRESH_TOKEN_SECRET 09111971F2
ENV PG_USER postgres
ENV PG_HOST postgres
ENV PG_DATABASENAME postgres
ENV PG_PASSWORD postgres
ENV PG_PORT 5432
RUN npm run build

RUN rm -f Dockerfile && rm -f tsconfig.json

RUN rm -Rf ./src

EXPOSE 3000

USER dev

CMD ["node","./dist/src/server.js"]