FROM node:12-alpine
 WORKDIR /frontend
 COPY . .
 RUN npm install --production
 CMD ["node", "src/index.js"]