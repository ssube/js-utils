#! /bin/sh

IMAGE_PUSH="${1:---skip}"
IMAGE_TAG="${CI_PROJECT_PATH}:${CI_COMMIT_TAG:-${CI_COMMIT_REF_SLUG}}"

echo "Building image: ${IMAGE_TAG}"

docker build -t ${IMAGE_TAG} .

if [[ "${IMAGE_PUSH}" == "--push" ]];
then
  echo "Pushing image: ${IMAGE_TAG}"
  docker push ${IMAGE_TAG}
fi
