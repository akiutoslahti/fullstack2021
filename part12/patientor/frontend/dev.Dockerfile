FROM node:16
WORKDIR /src
COPY . /src
RUN npm install
RUN npm install -g chokidar
CMD ["npm", "start"]