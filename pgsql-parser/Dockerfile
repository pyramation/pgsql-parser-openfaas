FROM mhart/alpine-node:10.11.0

RUN mkdir -p /home/app

RUN apk --no-cache add curl \
    && echo "Pulling watchdog binary from Github." \
    && curl -sSL https://github.com/openfaas/faas/releases/download/0.9.6/fwatchdog > /usr/bin/fwatchdog \
    && chmod +x /usr/bin/fwatchdog \
    && cp /usr/bin/fwatchdog /home/app \
    && apk del curl --no-cache

# install python for node-gyp
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
    && pip install virtualenv \
    && rm -rf /var/cache/apk/*

RUN addgroup -S app && adduser app -S -G app
RUN chown app /home/app
WORKDIR /home/app
USER app

COPY package.json .
COPY src /home/app/src

RUN yarn install

ENV write_debug="false"
ENV cgi_headers="true"
ENV fprocess="node src/handler.js"

EXPOSE 8080

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1
CMD [ "fwatchdog" ]
