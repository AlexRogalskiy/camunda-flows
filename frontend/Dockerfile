# npm install
FROM node:carbon-jessie AS node-builder
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install
COPY . /app

RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=node-builder /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
