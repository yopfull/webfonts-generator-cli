FROM node:9-alpine

# Installs latest Chromium (68) package.
RUN apk update && \
  apk upgrade && \
  echo @3.8 https://ftp.acc.umu.se/mirror/alpinelinux.org/v3.8/community >> /etc/apk/repositories && \
  echo @3.8 https://ftp.acc.umu.se/mirror/alpinelinux.org/v3.8/main >> /etc/apk/repositories && \
  apk add --no-cache \
    freetype@3.8 \
    harfbuzz@3.8 \
    chromium@3.8 \
    nss@3.8 \
    bash \
    git

ENV CHROMIUM_BIN=/usr/bin/chromium-browser

WORKDIR /usr/src/app
COPY . /usr/src/app/

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN npm install -g npm
RUN npm install
