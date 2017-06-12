FROM node:7.8-alpine

ENV USERNAME nodeuser

RUN adduser -D $USERNAME && \
    mkdir /code && \
    chown $USERNAME:$USERNAME /code

USER $USERNAME
WORKDIR /code

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ENV PORT = 3333

COPY yarn.lock package.json /code/

USER root
RUN find /code -user 0 -print0 | xargs -0 chown $USERNAME:$USERNAME
USER $USERNAME

RUN NODE_ENV=development && yarn
EXPOSE 3333

COPY . /code

USER root
RUN find /code -user 0 -print0 | xargs -0 chown $USERNAME:$USERNAME
USER $USERNAME

RUN npm rebuild node-sass
RUN cd node_modules/nhsuk-frontend && npm run postinstall
RUN npm run build

RUN ["yarn"]



