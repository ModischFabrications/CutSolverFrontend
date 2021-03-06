FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
# env replacement
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

EXPOSE 80
# curl not in alpine package
HEALTHCHECK --interval=5m --timeout=5s CMD wget -q --spider http://localhost:80/ || exit 1

ENTRYPOINT [ "/entrypoint.sh" ]
