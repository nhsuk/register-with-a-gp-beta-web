#!/bin/sh

if [ ! -f "/usr/bin/rancher" ] ; then
  RANCHER_VERSION='v0.6.0-rc2'

  echo "Installing Rancher (${RANCHER_VERSION})"
  curl -L -o /tmp/rancher.tar.gz https://github.com/rancher/cli/releases/download/${RANCHER_VERSION}/rancher-linux-amd64-${RANCHER_VERSION}.tar.gz

  mkdir -p /tmp/rancher
  tar -C /tmp/rancher/ -xzf /tmp/rancher.tar.gz
  mv /tmp/rancher/rancher-${RANCHER_VERSION}/rancher ./rancher
  rm -r /tmp/rancher /tmp/rancher.tar.gz
fi
