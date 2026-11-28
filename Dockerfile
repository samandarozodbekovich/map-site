# Stage 1: copy MapLibre GL into public/vendor (self-hosted, no CDN)
FROM node:24-alpine AS build
WORKDIR /site
COPY package*.json ./
RUN npm ci
COPY public ./public
RUN mkdir -p public/vendor \
    && cp node_modules/maplibre-gl/dist/maplibre-gl.js node_modules/maplibre-gl/dist/maplibre-gl.css public/vendor/

# Stage 2: static server
FROM nginx:alpine@sha256:1bb9390209f866c8c0bf76ba89d3f33a3f6cd6a0e6c1b457af7ee763b9579f41
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /site/public /usr/share/nginx/html
RUN chmod -R a+rX /usr/share/nginx/html
EXPOSE 80
