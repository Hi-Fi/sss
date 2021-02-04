FROM golang:1.15-alpine

WORKDIR /opt/code

RUN apk add --no-cache make git \
    && GO111MODULE=off go get -u github.com/codegangsta/gin

ENTRYPOINT ["/bin/sh"]

CMD ["-c", "make run"]
