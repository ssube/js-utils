# Rollup Template

This project contains the base configuration and build scripts for most of my Typescript/Rollup projects.

[![Pipeline status](https://img.shields.io/gitlab/pipeline/ssube/rollup-template.svg?gitlab_url=https%3A%2F%2Fgit.apextoaster.com&logo=gitlab)](https://git.apextoaster.com/ssube/rollup-template/commits/master)
[![MIT license](https://img.shields.io/github/license/ssube/rollup-template.svg)](https://github.com/ssube/rollup-template/blob/master/LICENSE.md)

[![Renovate badge](https://badges.renovateapi.com/github/ssube/rollup-template)](https://renovatebot.com)
[![Known vulnerabilities](https://snyk.io/test/github/ssube/rollup-template/badge.svg)](https://snyk.io/test/github/ssube/rollup-template)
[![Dependency status](https://img.shields.io/david/ssube/rollup-template.svg)](https://david-dm.org/ssube/rollup-template)
[![Dev dependency status](https://img.shields.io/david/dev/ssube/rollup-template.svg)](https://david-dm.org/ssube/rollup-template?type=dev)

[![Maintainability score](https://api.codeclimate.com/v1/badges/0ca333e0379bda050d84/maintainability)](https://codeclimate.com/github/ssube/rollup-template/maintainability)
[![Technical debt ratio](https://img.shields.io/codeclimate/tech-debt/ssube/rollup-template.svg)](https://codeclimate.com/github/ssube/rollup-template/trends/technical_debt)
[![Quality issues](https://img.shields.io/codeclimate/issues/ssube/rollup-template.svg)](https://codeclimate.com/github/ssube/rollup-template/issues)

## Contents

- [Rollup Template](#rollup-template)
  - [Contents](#contents)
  - [Features](#features)
    - [Intentionally Omitted Features](#intentionally-omitted-features)
  - [Usage](#usage)
    - [To Setup](#to-setup)
    - [To Build](#to-build)
    - [To Release](#to-release)
  - [External Services](#external-services)
    - [Maintenance Bots](#maintenance-bots)
  - [External Secrets](#external-secrets)

## Features

- bundled with rollup
- tested with mocha
- type checking from typescript
- style checking from tslint (with plugins)
- code coverage with source maps from nyc
- pipeline and published tags with gitlab CI
- identical local and CI builds with make
- test harness with mocha, source map support, and helpers for async leak tracking
- changelog from standard-release

### Intentionally Omitted Features

- everything frontend: React, CSS, etc
- heavy backend libraries: ORMs, etc

## Usage

### To Setup

To create a new repository from this template:

- create your new repo on Github & Gitlab (your server or Gitlab.com)
- `git clone git@github.com:ssube/rollup-template.git your-project`
- `cd your-project`
- `git remote add github git@github.com:yourname/your-project.git`
- `git remote add gitlab git@gitlab.com:yourname/your-project.git`
- set up repository mirroring in Gitlab
- set up [some maintenance bots](#maintenance-bots)
- `make git-push`
- install your dependencies
- write some code

### To Build

Once your project is set up:

- `make` to bundle and test
- commit
- `make git-push`

The `git-push` target pushed to Github first, to avoid conflicts with changes from bots and other contributors.

### To Release

When your project is ready to release:

- `make release-dry` to make sure your changelog and options look right
- `make release`

Additional options can be passed with the `RELEASE_OPTS` variable. Frequently-used options include `--release-as minor`
and `--prerelease`.

## External Services

This template works with or expects a few external services, namely a Gitlab CI server (self-hosted or using
Gitlab.com).

### Maintenance Bots

Good tests and clever bots can eliminate the most painful parts of project maintenance. This repository is
configured to work with:

- [CodeCov](https://codecov.io/)
- [Code Climate](https://codeclimate.com/)
- [LGTM](https://lgtm.com/)
- [Renovate](https://renovatebot.com/)
- [Snyk](https://snyk.io/)
- [SonarCloud](https://sonarcloud.io/)

None of these are required, but Renovate and Snyk can be very helpful when dependencies release a security patch.

## External Secrets

This template expects a few secrets to exist in the environment, including tokens for the [external services](#external-services).

| Name                | Description                                           |
| ------------------- | ----------------------------------------------------- |
| CC_TEST_REPORTER_ID | code climate ID                                       |
| CODECLIMATE_SECRET  | code climate token                                    |
| CODECOV_SECRET      | codecov token                                         |
| DOCKER_SECRET       | docker config, required for publishing images         |
| GITHUB_SECRET       | github.com token, required for publishing status      |
| NPM_SECRET          | npmjs.com token, required for publishing npm packages |
| SONAR_SECRET        | sonarcloud token                                      |
