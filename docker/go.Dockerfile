FROM golang:1.20-alpine

WORKDIR /opt/code

RUN apk add --no-cache make \
    && go get -u github.com/codegangsta/gin

ENTRYPOINT ["/bin/sh"]

CMD ["-c", "make run"]
