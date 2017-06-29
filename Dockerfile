FROM node:7.10-alpine

ENV USERNAME nodeuser

RUN adduser -D $USERNAME && \
    mkdir /code && \
    chown $USERNAME:$USERNAME /code

USER $USERNAME
WORKDIR /code

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY yarn.lock package.json /code/

# install dev dependences because they're used by yarn build
RUN NODE_ENV=development && yarn --pure-lockfile --ignore-optional
EXPOSE 3333
RUN npm rebuild node-sass
RUN cd node_modules/nhsuk-frontend && npm run postinstall


COPY . /code

USER root
RUN find /code -user 0 -print0 | xargs -0 chown $USERNAME:$USERNAME
USER $USERNAME

RUN yarn build

#CMD yarn start
