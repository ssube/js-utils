FROM node:12-stretch
# alpine may be smaller, but comes with a 10-15% perf hit

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

COPY . /app

WORKDIR /app

RUN yarn install --production
RUN yarn global add file:$(pwd)
ENV PATH="${PATH}:$(yarn global bin)"

ENTRYPOINT [ "node", "/app/out/index.js" ]
CMD [ "--help" ]