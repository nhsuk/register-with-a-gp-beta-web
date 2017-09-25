# Register With A GP Beta Web

[![Greenkeeper badge](https://badges.greenkeeper.io/nhsuk/register-with-a-gp-beta-web.svg)](https://greenkeeper.io/)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
master: ![master](https://travis-ci.org/nhsuk/register-with-a-gp-beta-web.svg?branch=master)
last commit: ![build](https://travis-ci.org/nhsuk/register-with-a-gp-beta-web.svg)

> Front end for the register for a GP beta service

TODO: Fill out this long description.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install




### Local Environment (option 1)

#### Node

[Install Node] for your platform. We are targeting version 7.5.0 which is the
`current` release as of writing. If you already have another version of node you
can use a Node version manager so select the correct version, the following are
good options for managing installed Node versions:

* [n](https://github.com/tj/n)
* [nvm](https://github.com/creationix/nvm)

##### Environment Variables

Create your `.env` file on your local project directory and define these variables.

```
NODE_ENV=development
SESSION_SECRET=put_in_a_random_string_here_thats_longer_than_thirty_two_chars

POSTCODE_API_HOST=api.getAddress.io
POSTCODE_API_KEY=<getAddress.io API KEY>

GP_LOOKUP_API_URL = http://localhost
GP_LOOKUP_API_PORT = 9292
GPLookupAPISSL = "0"

GP_EMAIL_ROSEBANK_HEALTH=test@test.com
GP_EMAIL_PEEL_CROFT_SURGERY=test@test.com
```
> The GP emails variable name template is `GP_EMAIL_<THE_GP_KEY>` in upper case form.

#### Dependency Management: Yarn

Once you have `node` installed, you need
to
[install the `yarn` package manager](https://yarnpkg.com/lang/en/docs/install/).
This will allow you to install the JavaScript dependencies that are specified
in [`package.json`](package.json)

```bash
$ yarn
```

### Docker & Compose (option 2)

Make sure you have Docker and compose installed for your operating system
then run:

```bash
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

> Note: The Dockerfile is currently set up to provide a development
> (live-reloading) server, we need to look at removing `devDependences` from the
> runtime environment when we do start hosting in Rancher

If you want to run in production mode then you should run:
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

Because these commands are annoying to type there are some helper scripts in
the `bin` directory:

| Script | Command |
|:---------|:------------|
| `bin/dev.sh` | `$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up` |
| `bin/prod.sh` | `$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up` |

To correctly test the production version (it sends cookies with the secure flag)
you will need to browse it with a HTTPS connection. I do this by installing
a local proxy that generates a self signed certificate and forwards all the
traffic.

```bash
# globally install dev proxy
$ npm -g i dev-proxy

# start server in detached mode
$ ./bin/dev.sh -d

# start dev-proxy
$ dev-proxy -p 3333:3334
```
then browse to https://localhost:3334 - you will get a certificate warning and
you can either install the local dev certificate or ignore the warning if you
know what you're doing.

## Usage

### Development

```bash
$ yarn run dev
```

#### ES2017 and Babel

The JavaScript in the project is written in ES2017 and transpiled into ES5 using
`Babel`, you can view our babel configuration in [package.json](./package.json)
under the "babel" key.

#### Environment Variables

| Variable | Description | Default |
|:---------|:------------|:--------|
| `NODE_ENV` | if we are running in `production` or `development` mode | `development` |
| `PORT` | the port for the http server to listen on (optional) | `3333` |
| `SESSION_SECRET` | the password for signing the session cookie | No default |
| `EMAIL_USERNAME` | Username for Exchange Webservice |  |
| `EMAIL_PASSWORD` | Password for Exchange Webservice |  |
| `EMAIL_HOST` | Exchange Webservice host (with `https://...`) |  |
| `GP_EMAIL_[practice key]` | GP practice recipient email address. See [GP Email addresses](#gp-email-addresses) for more info. |  |
| `POSTCODE_API_KEY` | Api key for getAddress.io |  |
| `POSTCODE_API_HOST` | Api host for getAddress.io |  |

##### GP Email addresses

To keep the value of the recipient email address private they need to be stored
in environment variables. Each GP email variable is made up of `GP_EMAIL_` and
a constant case of the key stored in [practices.json](./data/practices.json).

**Example:**

peel-croft-surgery would be:

```
GP_EMAIL_PEEL_CROFT_SURGERY=email-address@domain.com
```

### Tests

#### Unit tests

You can run the tests with the following:
```bash
$ yarn test
```

#### Acceptance tests

Acceptance tests are running through codecept.js and backed by Selenium.

Installation on Linux or Mac:
```bash
./node_modules/.bin/selenium-standalone install
```

Running the tests on Linux or Mac:

Terminal session 1:
```bash
./node_modules/.bin/selenium-standalone start
```
Terminal session 2:
```bash
yarn test:acceptance_local
```

### Production

```bash
$ yarn build && NODE_ENV=production yarn start
```

## Contribute

### Pull Requests

We use [Github Flow][gh-flow]. If you're in the organisation then just create a
branch and create a pull request.

If you're outside of the organisation then we're not currently unsure how you'd
assign the copyright of your contributions to the NHS. If you do have a
significant contribution you'd like to make then talk to us first and we'll
figure it out.

### Architecture Decision Records

If you look in [docs/architecture/decisions](./docs/architecture/decisions)
you'll see our [Architecture Decision Records]. Which is where we record
large decision about the design of this project including the context around
that decision.

### Code Quality

#### Style Guide

Write code that matches our code style which is
[eslint:recommended][eslint-recommended] plus
2 space indentation, always use semi-colons and single quotes for strings.

You can check your code conforms by running

```bash
$ yarn run lint:eslint
```

#### Coverage

We want to keep coverage high and our test suite does output a coverage
summary. The build will fail if coverage drops below:

* 75% of statements
* 75% of lines
* 70% of functions
* 75% of statements

This is a low bar and we aim to increase it as we write more code.

You can see the coverage summary by running:

```bash
$ yarn test
```
it should look like:

| File                         |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
|:----------------------------|:---------|:---------|:---------|:---------|:---------------|
|All files                    |    77.59 |       50 |    82.35 |    77.59 |                |
| client                      |      100 |      100 |      100 |      100 |                |
|  webpack.config.babel.js    |      100 |      100 |      100 |      100 |                |
| server                      |    83.33 |       50 |       90 |    83.33 |                |
|  hello-world.js             |      100 |      100 |      100 |      100 |                |
|  index.js                   |       80 |       50 |     87.5 |       80 |... 115,122,131 |
| server/plugins/nunjucks     |    66.67 |       50 |    66.67 |    66.67 |                |
|  index.js                   |    66.67 |       50 |    66.67 |    66.67 |... 26,27,28,29 |
| server/plugins/static-files |      100 |      100 |      100 |      100 |                |
|  index.js                   |      100 |      100 |      100 |      100 |                |


#### Editorconfig

We have an [.editorconfig][editorconfig] which checks you're not leaving unnecessary spacing,
strange indentation or missing new lines at the end of file.

You can probably get a plugin for your editor to tell you when you're breaking
our rules. Alternatively you can run it manually:

```bash
$ yarn lint:editorconcfig
```

If you're code doesn't conform then the [CI](#continuous-integration) build will fail.

### Continuous Integration

#### TravisCI

We are using [TravisCI] for our continuous integration, each commit triggers a
CI build which runs all the tests and the linter, it doesn't deploy anywhere
as of yet.

#### TeamCity

We are looking at using the TeamCity server at https://tc.nhschoices.net but
at this point in time there doesn't seem to be a compelling case to move over.

#### Deploy to Heroku

```bash
heroku plugins:install heroku-container-tools
heroku plugins:install heroku-container-registry
heroku container:login

heroku create register-with-gp
heroku config:set NODE_ENV=development --app register-with-gp
heroku config:set SESSION_SECRET=secret_session_session --app register-with-gp
heroku ps:scale web=1 --app register-with-gp
heroku container:push web --app register-with-gp
heroku open --app register-with-gp
```

## License
Short version: MIT
Long version: see [LICENCE.txt](LICENSE.txt)


Small note: If editing the README, please conform to
the [standard-readme](https://github.com/RichardLitt/standard-readme)
specification.

 © Crown Copyright

[gh-flow]: https://guides.github.com/introduction/flow/
[Install Node]: https://nodejs.org/en/download/current/
[Architecture Decision Records]: http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions
[eslint-recommended]: https://github.com/eslint/eslint/blob/master/conf/eslint.json
[editorconfig]: http://editorconfig.org/
[TravisCI]: https://travis-ci.org/nhsuk/register-with-a-gp-beta-web
