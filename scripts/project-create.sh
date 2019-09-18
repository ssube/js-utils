#! /bin/bash

PROJECT_NAME="${1}"
PROJECT_PATH="${2:-${USER}}"

echo "Creating project ${PROJECT_NAME}..."
mkdir ../"${PROJECT_NAME}"
pushd ../"${PROJECT_NAME}"

echo "Setting up repository..."
git init
git remote add github git@github.com:${PROJECT_PATH}/${PROJECT_NAME}.git
git remote add gitlab git@git.apextoaster.com:${PROJECT_PATH}/${PROJECT_NAME}.git

echo "Setting up template..."
popd
./scripts/project-update.sh "../${PROJECT_NAME}"