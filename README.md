# JS Utils

This project is a collection of utilities meant to extend lodash, collected from my
other Typescript projects, lightly documented, and heavily tested.

## Contents

- [JS Utils](#js-utils)
  - [Contents](#contents)
  - [Status](#status)
  - [Releases](#releases)
  - [Usage](#usage)
  - [Features](#features)

## Status

[![Pipeline status](https://img.shields.io/gitlab/pipeline/ssube/js-utils.svg?gitlab_url=https%3A%2F%2Fgit.apextoaster.com&logo=gitlab)](https://git.apextoaster.com/ssube/js-utils/commits/master)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ssube_js-utils&metric=ncloc)](https://sonarcloud.io/dashboard?id=ssube_js-utils)
[![Test coverage](https://codecov.io/gh/ssube/js-utils/branch/master/graph/badge.svg)](https://codecov.io/gh/ssube/js-utils)
[![MIT license](https://img.shields.io/github/license/ssube/js-utils.svg)](https://github.com/ssube/js-utils/blob/master/LICENSE.md)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fssube%2Fjs-utils.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fssube%2Fjs-utils?ref=badge_shield)

[![Open bug count](https://img.shields.io/github/issues-raw/ssube/js-utils/type-bug.svg)](https://github.com/ssube/js-utils/issues?q=is%3Aopen+is%3Aissue+label%3Atype%2Fbug)
[![Open issue count](https://img.shields.io/github/issues-raw/ssube/js-utils.svg)](https://github.com/ssube/js-utils/issues?q=is%3Aopen+is%3Aissue)
[![Closed issue count](https://img.shields.io/github/issues-closed-raw/ssube/js-utils.svg)](https://github.com/ssube/js-utils/issues?q=is%3Aissue+is%3Aclosed)

[![Renovate badge](https://badges.renovateapi.com/github/ssube/js-utils)](https://renovatebot.com)
[![Dependency status](https://img.shields.io/david/ssube/js-utils.svg)](https://david-dm.org/ssube/js-utils)
[![Dev dependency status](https://img.shields.io/david/dev/ssube/js-utils.svg)](https://david-dm.org/ssube/js-utils?type=dev)
[![Known vulnerabilities](https://snyk.io/test/github/ssube/js-utils/badge.svg)](https://snyk.io/test/github/ssube/js-utils)

[![Maintainability score](https://api.codeclimate.com/v1/badges/2cb00161d1eaa63cf7c6/maintainability)](https://codeclimate.com/github/ssube/js-utils/maintainability)
[![Technical debt ratio](https://img.shields.io/codeclimate/tech-debt/ssube/js-utils.svg)](https://codeclimate.com/github/ssube/js-utils/trends/technical_debt)
[![Quality issues](https://img.shields.io/codeclimate/issues/ssube/js-utils.svg)](https://codeclimate.com/github/ssube/js-utils/issues)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/ssube/js-utils.svg?logo=lgtm)](https://lgtm.com/projects/g/ssube/js-utils/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/ssube/js-utils.svg)](https://lgtm.com/projects/g/ssube/js-utils/alerts/)

## Releases

[![github release link](https://img.shields.io/badge/github-release-blue?logo=github)](https://github.com/ssube/js-utils/releases)
[![github release version](https://img.shields.io/github/tag/ssube/js-utils.svg)](https://github.com/ssube/js-utils/releases)
[![github commits since release](https://img.shields.io/github/commits-since/ssube/js-utils/v0.1.6.svg)](https://github.com/ssube/js-utils/compare/v0.1.6...master)

[![npm package link](https://img.shields.io/badge/npm-package-blue?logo=npm)](https://www.npmjs.com/package/@apextoaster/js-utils)
[![npm release version](https://img.shields.io/npm/v/@apextoaster/js-utils.svg)](https://www.npmjs.com/package/@apextoaster/js-utils)
[![Typescript definitions](https://img.shields.io/npm/types/@apextoaster/js-utils.svg)](https://www.npmjs.com/package/@apextoaster/js-utils)

## Usage

Install:

```shell
yarn add -D @apextoaster/js-utils
```

And import:

```typescript
import { mustExist } from '@apextoaster/js-utils';
```

The library is bundled and has no dependencies.

## Features

Features utilities and helpers for:

- Array
  - assertions/guards:
    - `hasItems`
    - `isArray` for both `Array`/`ReadonlyArray`
    - `isEmpty`
    - `lengthOf`
  - conversion
    - `filterZip`
    - `toArray`
- Array Mapper
  - array-to-map converter, reduces an array of values to a map, using an array of keys
- Async
  - timed promises
    - `defer`/`deferValue`
    - `deferUntil`
    - `timeout`
- Buffer
  - concatenation
    - `concat`
    - `encode`
- Checklist
  - allow/deny list
- Child Process
  - `childResult`
  - `writeInput`
- Env Vars
  - `isDebug`
- Logger
  - test logging helpers
- Map
  - types
    - `MapLike`
  - assertions/guards:
    - `mustGet`
  - null-safe helpers
    - `getOrDefault`
  - helpers for `Map<K, Array<V>>`
    - `getHead`/`getHeadOrDefault`
    - `setOrPush`
  - concat/merge
    - `mergeMap`
    - `pushMergeMap`
  - conversion
    - `entriesOf`
    - `makeDict`
    - `makeMap`
    - `pairsToMap`
- Math
  - predicates for functional methods
    - `sum`
- Maybe
  - types
    - `Maybe`
    - `None`
  - assertions/guards
    - `doesExist`
    - `mustExist`
    - `mustDefault`
    - `mustFind`
    - `removeNone`
  - null-safe helpers
    - `isNone`
    - `isSome`
- Predicate
  - types for functional methods
- Reflect
  - `getConstructor`
  - `getMethods`
- Signal
  - wait for OS signal
    - `signal`
- String
  - `leftPad`
  - `trim` with suffix
