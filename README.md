# Rollup Template

This project contains the base configuration and build scripts for most of my Typescript/Rollup projects.

## Contents

- [Rollup Template](#rollup-template)
  - [Contents](#contents)
  - [Features](#features)
    - [Intentionally Omitted Features](#intentionally-omitted-features)
  - [Usage](#usage)
    - [Setup](#setup)
    - [Daily](#daily)
  - [External Services](#external-services)
    - [Maintenance Bots](#maintenance-bots)

## Features

- bundled with rollup
- tested with mocha
- type checking from typescript
- style checking from tslint (with plugins)
- code coverage with source maps from nyc
- pipeline and published tags with gitlab CI
- identical local and CI builds with make
- test harness with source map support and helpers for async leak tracking

### Intentionally Omitted Features

- everything frontend: React, CSS, etc
- heavy backend libraries: ORMs, etc

## Usage

### Setup

To create a new repository from this template:

- `git clone git@github.com:ssube/rollup-template.git new-project`
- create your new repo
- `git remote add github git@github.com:yourname/your-project.git`
- `git remote add gitlab git@gitlab.com:yourname/your-project.git`
- set up repository mirroring in Gitlab
- set up [some maintenance bots](#maintenance-bots)
- `make git-push`
- install your dependencies
- write some code

### Daily

Once your project is set up:

- `make` to bundle and test
- commit
- `make git-push`

The `git-push` target pushed to Github first, to avoid conflicts with changes from bots and other contributors.

## External Services

This template works with or expects a few external services, namely a Gitlab CI server (self-hosted or using
Gitlab.com).

### Maintenance Bots

Good tests and clever bots can eliminate the most painful parts of project maintenance. This repository is configured
to work with:

- [CodeCov](https://codecov.io/)
- [Code Climate](https://codeclimate.com/)
- [LGTM](https://lgtm.com/)
- [Renovate](https://renovatebot.com/)
- [Snyk](https://snyk.io/)
- [SonarCloud](https://sonarcloud.io/)

None of these are required, but Renovate and Snyk can be very helpful when dependencies release a security patch.
