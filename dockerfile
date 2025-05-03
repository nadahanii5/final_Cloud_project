FROM node:14

WORKDIR /app

COPY . /app

RUN npm install
COPY .. /
ENV port=3000
EXPOSE 3000

CMD ["npm", "start"]

