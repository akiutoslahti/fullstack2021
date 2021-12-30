FROM node:16 as build-stage
WORKDIR /src
COPY . /src
RUN npm ci
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-stage /src/build /usr/share/nginx/html