FROM node:7.8-alpine

ENV NODE_ENV ${NODE_ENV:-development}
ENV PORT ${PORT:-3333}

RUN npm set progress=false
RUN mkdir -p /usr/src/app/node_modules

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# install dev dependences because they're used by yarn build
RUN /bin/sh -c "NODE_ENV=development yarn"

RUN npm rebuild node-sass
RUN cd /usr/src/app/node_modules/nhsuk-frontend && npm run postinstall

COPY ./ ./

RUN npm run build

CMD [ "/bin/sh", "-c", "npm run start" ]
