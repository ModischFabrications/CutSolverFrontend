FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine
# https://github.com/opencontainers/image-spec/blob/master/annotations.md
LABEL "org.opencontainers.image.title"="CutSolverFrontend"
LABEL "org.opencontainers.image.vendor"="Modisch Fabrications"
LABEL "org.opencontainers.image.source"="https://github.com/ModischFabrications/CutSolverFrontend/"
LABEL "org.opencontainers.image.licenses"="GPL-3.0"

COPY --from=build-stage /app/dist /usr/share/nginx/html
# env replacement
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

EXPOSE 80
# curl not in alpine package
HEALTHCHECK --interval=1m --timeout=5s CMD wget -q --spider http://0.0.0.0:80/ || exit 1

ENTRYPOINT [ "/entrypoint.sh" ]
