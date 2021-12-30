FROM node:16-alpine
WORKDIR /src
COPY . /src
RUN npm ci
RUN npm run tsc
CMD ["npm", "start"]