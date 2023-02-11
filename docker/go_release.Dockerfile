############################
# STEP 1 get ca-certificates
############################

FROM alpine:3.6 as alpine

RUN apk add -U --no-cache ca-certificates

############################
# STEP 2 build a small image
############################
FROM scratch


ARG APPLICATION_FILE_PATH
ENV GIN_MODE=release

# Add ca-certificates
COPY --from=alpine /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

ADD ${APPLICATION_FILE_PATH} /opt/

WORKDIR /opt

# Run the application binary.
ENTRYPOINT ["/opt/application"]
