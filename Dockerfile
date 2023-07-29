FROM node:alpine

WORKDIR /api

COPY package.json .

RUN npm cache clean --force && rm -rf node_modules && npm install

COPY ./ ./

EXPOSE 3000

CMD ["node", "src/app.js"]