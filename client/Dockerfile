FROM node as base

WORKDIR /app

EXPOSE 3000


FROM base as dev

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]


FROM base as test

COPY package.json .

RUN npm install

COPY . .

RUN npm run test