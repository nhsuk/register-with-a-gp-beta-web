FROM node:7.10-alpine

ENV USERNAME nodeuser

RUN adduser -D $USERNAME && \
    mkdir /code && \
    chown $USERNAME:$USERNAME /code

USER $USERNAME
WORKDIR /code

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG GPMedicalPracticesSourceURL=https://raw.githubusercontent.com/nhsuk/general-medical-practices/master/output/general-medical-practices.json
ARG GPMedicalPractitionersSourceURL=https://raw.githubusercontent.com/nhsuk/general-medical-practitioners/master/output/general-medical-practitioners.json
ARG ES_HOST=profiles-db-elastic.profiles-db-elastic-gp-reg
ARG ES_PORT=9200

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

CMD yarn start

RUN yarn update_gp_index
