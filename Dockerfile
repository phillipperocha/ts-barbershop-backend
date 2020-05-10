FROM node:13-alpine

WORKDIR /usr/backend
COPY package.json /usr/backend
RUN yarn

ENV PATH /usr/backend/node_modules/.bin:$PATH

COPY . /usr/backend
CMD yarn dev:server
