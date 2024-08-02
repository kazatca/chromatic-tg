FROM node:18-alpine

LABEL org.opencontainers.image.source https://github.com/kazatca/chromatic-tg

WORKDIR /app
COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .
RUN npm run build

CMD ["node", "./dist"]