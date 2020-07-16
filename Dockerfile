FROM node:12

ARG crypto_key=the_pwd_come_in_build_cmd_line
ARG node_env=development

ENV CRYPTO_KEY $crypto_key
ENV NODE_ENV=$node_env

#RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "src/server.js" ]