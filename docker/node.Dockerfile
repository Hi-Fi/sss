FROM node:19-alpine

WORKDIR /opt/code

ENTRYPOINT ["/bin/sh"]

CMD ["-c", "yarn && yarn start"]
