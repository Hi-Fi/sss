############################
# STEP 1 get ca-certificates
############################

FROM alpine:3.6 as alpine

RUN apk add -U --no-cache ca-certificates

############################
# STEP 2 build a small image
############################
FROM scratch

ENV GIN_MODE=release
ARG APPLICATION_BINARY_PATH

# Add ca-certificates
COPY --from=alpine /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Copy our static executable.
ADD ${APPLICATION_BINARY_PATH} /opt/application

# Run the application binary.
ENTRYPOINT ["/opt/application"]
