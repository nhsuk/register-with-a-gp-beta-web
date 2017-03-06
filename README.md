# Register With A GP Beta Web

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

```
$ docker-compose up
```

> Note: The Dockerfile is currently set up to provide a development
> (live-reloading) server, we need to look at removing `devDependences` from the
> runtime environment when we do start hosting in Rancher

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


#### Tests

You can run the tests with the following:
```bash
$ yarn test
```

We have picked `jest` because it lets us get a test framework up and running
without having to make too many decision about libraries, runners, mocks and
execution environments but I can see that we would want to run our tests in
headless browsers at some point. I recommend moving to a
`mocha/chai-as-promised` + `jsdom` + `sinon`

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
summary. We don't fail the build if coverage is below a certain % but we will
do that in the future.

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
