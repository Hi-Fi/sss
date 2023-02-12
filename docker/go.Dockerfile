FROM golang:1.19-alpine

WORKDIR /opt/code

RUN apk add --no-cache make \
    && go install github.com/codegangsta/gin@master

ENTRYPOINT ["/bin/sh"]

CMD ["-c", "make run"]
