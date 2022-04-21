FROM node:18-alpine

WORKDIR /opt/code

ENTRYPOINT ["/bin/sh"]

CMD ["-c", "yarn && yarn start"]
