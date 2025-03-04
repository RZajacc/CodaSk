ARG NODE_VERSION=22

FROM node:${NODE_VERSION} as base

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

RUN apk add --no-cache \
    build-base \
    python3 \
    vips-dev

RUN npm install

COPY . .

# Uncomment after adding TS to backend
# RUN npm run build

CMD [ "npm", "run", "start:prod" ]