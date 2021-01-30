FROM node:current-alpine

WORKDIR /opt/code

ENTRYPOINT ["/bin/sh"]

CMD ["-c", "yarn && yarn start"]
