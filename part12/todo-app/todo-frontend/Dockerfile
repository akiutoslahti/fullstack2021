FROM node:16 as base
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app

FROM base
RUN npm ci
ENV CI=true
RUN npm run test

FROM base as build-stage
RUN npm ci
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
RUN npm ci --only=production
RUN npm run build

FROM nginx:1.20-alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html