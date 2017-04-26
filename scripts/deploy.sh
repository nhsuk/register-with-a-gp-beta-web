#!/usr/bin/env bash

# See here http://redsymbol.net/articles/unofficial-bash-strict-mode/ the rational for using u, e and o bash options

set -u          #Display error message for missing variables
set -e          #Exit with error code if any command fails
set -o pipefail #prevents errors in a pipeline from being masked

export RANCHER_SERVER="rancher.nhschoices.net"
export RANCHER_URL="https://${RANCHER_SERVER}/v2-beta/schemas"

deploy() {

  echo -e "\nBuilding rancher stack $RANCHER_STACK_NAME in environment ${RANCHER_ENVIRONMENT}\n"

  echo "Rancher_Up"

  ./rancher \
    --wait \
      up  -p \
          -d \
          --upgrade \
          --force-upgrade \
          --confirm-upgrade \
          --env-file answers.txt \
          --file docker-compose.production.yml \
          --stack "${RANCHER_STACK_NAME}"

  echo "Rancher_Up"

}

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  export RANCHER_STACK_NAME="register-with-a-gp-pr-${TRAVIS_PULL_REQUEST}"
  export RANCHER_ENVIRONMENT="nhsuk-dev"
  deploy
elif [ "$TRAVIS_BRANCH" = "master" ]; then
  export RANCHER_STACK_NAME="register-with-a-gp"
  export RANCHER_ENVIRONMENT="nhsuk-dev"
  deploy
fi