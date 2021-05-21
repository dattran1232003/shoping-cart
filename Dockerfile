FROM node:14-alpine

WORKDIR /shoping-cart

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock


