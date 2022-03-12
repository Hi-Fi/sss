FROM node:17-alpine

WORKDIR /opt/code

ENTRYPOINT ["/bin/sh"]

CMD ["-c", "yarn && yarn start"]
