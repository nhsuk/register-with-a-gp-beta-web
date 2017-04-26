#/bin/sh

echo "TODO: Generate Answers file properly"


echo "" > answers.txt

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "DOCKER_IMAGE_TAG=pr-${TRAVIS_PULL_REQUEST}" >> answers.txt
elif [ -n "$TRAVIS_TAG" ]; then
  echo "DOCKER_IMAGE_TAG=${TRAVIS_TAG}" >> answers.txt
elif [ "$TRAVIS_BRANCH" = "master" ]; then
  echo "DOCKER_IMAGE_TAG=latest" >> answers.txt
else
  echo "DOCKER_IMAGE_TAG=${TRAVIS_BRANCH}" >> answers.txt
fi

# USE TRAVIS ENVS, :(
if [ "$TRAVIS_BRANCH" = "master" ]; then

  for SECRET in $STAGING_SECRETS; do
    echo "$SECRET" >> answers.txt
  done

  echo "TRAEFIK_DOMAIN=staging.beta.nhschoices.net" >> answers.txt

fi
