ARG NODE_VERSION=22

FROM node:${NODE_VERSION} as base

WORKDIR /app

EXPOSE 3000

# Test stage
FROM base as test

COPY package.json .

RUN npm install

COPY . .

RUN npm run test


# Dev stage
FROM base as dev

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]

