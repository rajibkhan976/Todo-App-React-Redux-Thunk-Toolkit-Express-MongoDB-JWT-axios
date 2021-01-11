# pull the base image
FROM node:12-alpine

# set the working direction
WORKDIR /frontend

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]