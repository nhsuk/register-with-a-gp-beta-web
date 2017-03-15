FROM node:7

ENV NODE_ENV ${NODE_ENV:-development}
ENV PORT ${PORT:-3333}

RUN npm set progress=false

RUN mkdir -p /usr/src/app

RUN  useradd -ms /bin/bash r && chown r -R /usr/src/app
USER r

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# install dev dependences because they're used by yarn build
RUN NODE_ENV=development yarn

RUN npm rebuild node-sass
RUN cd /usr/src/app/node_modules/nhsuk-frontend && npm run postinstall

COPY ./ ./

CMD [ "/bin/bash", "-c", "yarn run dev" ]
