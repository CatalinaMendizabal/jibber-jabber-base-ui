FROM node:16-alpine as react-build
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "tsconfig.json", "/app/"]
COPY ./ /app/
RUN cd /app && npm install
RUN npm -s run build

# Stage 2, based on Nginx
FROM nginx:1.17.0-alpine
COPY --from=react-build /app/build /usr/share/nginx/html
COPY nginx/conf.d/server.conf /etc/nginx/nginx.conf
EXPOSE 80