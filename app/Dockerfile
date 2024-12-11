FROM node:20-alpine3.19 as build

WORKDIR /app

COPY package.json /app/package.json
RUN npm install

COPY . /app
RUN npm run build

FROM nginx:stable-alpine3.17-slim

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]