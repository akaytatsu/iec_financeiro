ARG STAGE

# build stage
FROM node:14.19.3-alpine AS build_stage
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn run build:prd

# copy files and nginx conf
FROM nginx:stable-alpine AS publish_site
COPY  ./.nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build_stage /app/dist /usr/share/nginx/html
EXPOSE 7054
CMD ["nginx", "-g", "daemon off;"]