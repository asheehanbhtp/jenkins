FROM node:8

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build && npm prune --production

ENV PORT=80
ENV NAME=Docker


EXPOSE $PORT

CMD [ "npm", "run", "serve" ]

