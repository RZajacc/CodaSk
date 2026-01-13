ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-slim as base

WORKDIR /app

EXPOSE 5008

# DEV STAGE

FROM base as dev

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]

# PROD STAGE

FROM base as prod

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]