FROM node:7.8-alpine
ENV NODE_ENV ${NODE_ENV:-development}
ENV PORT ${PORT:-3333}
ENV USERNAME nodeuser
# create user and change code dir perms
RUN adduser -D $USERNAME && \
    mkdir -p /usr/src/app/node_modules && \
    chown $USERNAME:$USERNAME /usr/src/app/node_modules
RUN npm set progress=false
USER $USERNAME
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
# install dev dependences because they're used by yarn build
RUN /bin/sh -c "NODE_ENV=development yarn"
RUN npm rebuild node-sass
RUN cd /usr/src/app/node_modules/nhsuk-frontend && npm run postinstall
COPY ./ ./
# change copied files uid to normal user
USER root
RUN find /usr/src/app -user 0 -exec chown $USERNAME:$USERNAME {} \;
USER $USERNAME
RUN npm run build
CMD [ "/bin/sh", "-c", "npm run start" ]
