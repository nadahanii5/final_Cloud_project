FROM node:22.14.0 as build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
