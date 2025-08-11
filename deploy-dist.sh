#!/bin/bash
#
# Deploy dist to a web host
#

ENV_FILE=~/.seevoy.free.nf.env

if [ ! -f "${ENV_FILE}" ]; then
    echo
    echo "No env file ${ENV_FILE}"
    echo
    echo "Create the env file and export env variables: "
    echo
    echo "export SEEVOY_SERVER_HOST=xxx"
    echo "export SEEVOY_SERVER_USERNAME=xxx"
    echo "export SEEVOY_SERVER_PASSWORD=xxx"
    echo "export SEEVOY_SERVER_DIR=xxx"
    echo
    exit 1
fi

. ${ENV_FILE}


echo
echo "Begin deploy..."
echo

lftp -e "mirror -R --delete dist ${SEEVOY_SERVER_DIR}" -u ${SEEVOY_SERVER_USERNAME},${SEEVOY_SERVER_PASSWORD} ${SEEVOY_SERVER_HOST} </dev/null

echo
echo "Deploy completed."
echo



