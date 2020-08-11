FROM node:12
# Create app directory
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Bundle app source
COPY . .
EXPOSE 8080
CMD [ "yarn", "start" ]

