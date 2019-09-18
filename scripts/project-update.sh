#! /bin/bash
set -x

PROJECT_NAME="${1}"

echo "Updating project: ${PROJECT_NAME}"
git ls-tree -r HEAD --name-only | rsync -avh \
  --files-from=- \
  --exclude-from=./scripts/project-exclude \
  ./ "${PROJECT_NAME}"