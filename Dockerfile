# map-site: public map website (MapLibre). Served at / by the map_work stack;
# the iD editor lives at /edit/ in the main nginx.

# Stage 1: copy MapLibre GL into public/vendor (self-hosted, no CDN)
FROM node:24-alpine AS build
WORKDIR /site
COPY package*.json ./
RUN npm ci
COPY public ./public
RUN mkdir -p public/vendor \
    && cp node_modules/maplibre-gl/dist/maplibre-gl.js node_modules/maplibre-gl/dist/maplibre-gl.css public/vendor/

# Stage 2: static server
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /site/public /usr/share/nginx/html
RUN chmod -R a+rX /usr/share/nginx/html
EXPOSE 80
