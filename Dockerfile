FROM node:7

ENV NODE_ENV development

RUN npm set progress=false && npm install -g yarn

RUN mkdir -p /usr/src/app

RUN  useradd -ms /bin/bash r && chown r -R /usr/src/app
USER r

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY ./ ./

CMD [ "/bin/bash", "-c", "yarn run dev" ]
