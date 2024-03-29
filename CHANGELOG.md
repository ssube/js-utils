# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.5.0](https://github.com/ssube/js-utils/compare/v0.5.0-1...v0.5.0) (2022-10-08)

## [0.5.0-1](https://github.com/ssube/js-utils/compare/v0.5.0-0...v0.5.0-1) (2022-10-08)


### Bug Fixes

* **build:** correct entrypoint ([46a1b0d](https://github.com/ssube/js-utils/commit/46a1b0df1029c79f8459bfd05620debd544fd63d))

## [0.5.0-0](https://github.com/ssube/js-utils/compare/v0.4.1...v0.5.0-0) (2022-10-08)


### ⚠ BREAKING CHANGES

* **build:** the library will now be published as loose ES modules.
Library users are better informed on bundling needs, and repeated bundling introduces extra boilerplate code.

### Features

* **build:** remove rollup, do not bundle the output ([faeff2c](https://github.com/ssube/js-utils/commit/faeff2c645470853fa11122d814403e1b9ada849))


### Bug Fixes

* **build:** add target to upload coverage to codeclimate ([9230532](https://github.com/ssube/js-utils/commit/92305327429b1f128b95ba2a52b4f0d28b5f5858))
* **build:** swap in standard build ([c83651d](https://github.com/ssube/js-utils/commit/c83651d3201095798d40e0b053959b56c08c9c3b))
* **docs:** typedef and doc warnings ([d3e52d9](https://github.com/ssube/js-utils/commit/d3e52d9363425ca9862bbcbf088fac8d19755ef1))
* add missing typedef visibility comments ([a9d49cd](https://github.com/ssube/js-utils/commit/a9d49cd41dbac0e79ecd835807c1dd76979d4e63))
* internal module imports ([95bf7ac](https://github.com/ssube/js-utils/commit/95bf7ac982fb9e193cca90aa2b5b9bf2ab30662f))

### [0.4.1](https://github.com/ssube/js-utils/compare/v0.4.0...v0.4.1) (2022-02-14)


### Bug Fixes

* **build:** add docker TLS options, remove codecov job ([04de2b2](https://github.com/ssube/js-utils/commit/04de2b2bd53c1dac3c81d6c6e65aee7e34393659))
* **build:** move signature to release options ([b31767e](https://github.com/ssube/js-utils/commit/b31767eab072f7ef7277da6c39b6a7c243ae9a8b))
* **deps:** add istanbul schema for c8 ([38e2c70](https://github.com/ssube/js-utils/commit/38e2c7099d68c8472d0700a150ecff01e767debe))
* **docs:** correct badges, list error types ([50b029f](https://github.com/ssube/js-utils/commit/50b029ff8cd854a394706ab5d8b66ec2afbb873f))
* **types:** mark newer array functions as public ([2b72af5](https://github.com/ssube/js-utils/commit/2b72af526255ca7f66bed309282b93530ad22806))
* export missing symbols ([52e0822](https://github.com/ssube/js-utils/commit/52e08220e82a79d3a5608c8ece2275444bbd308c))

## [0.4.0](https://github.com/ssube/js-utils/compare/v0.4.0-1...v0.4.0) (2021-07-28)


### Features

* full es module build, fix up eslint and sinon imports ([788b5bb](https://github.com/ssube/js-utils/commit/788b5bb1650d394dcd61e67fc1df1411e29e55ea))
* remove unused lodash dependency ([c2ca9df](https://github.com/ssube/js-utils/commit/c2ca9dfd041bb0d997299d26814079def8f9d1ad))
* **build:** update eslint config, remove tslint plugins ([d55efc5](https://github.com/ssube/js-utils/commit/d55efc57a1344f78fb7425a4b26077cf0bf15a28))

## [0.4.0-1](https://github.com/ssube/js-utils/compare/v0.4.0-0...v0.4.0-1) (2021-07-10)


### ⚠ BREAKING CHANGES

* the 0.4.x release family will support Node 16+
and drop support for previous versions.

### Features

* upgrade noicejs to 4.0 ([8d7ec07](https://github.com/ssube/js-utils/commit/8d7ec07a2109ff5358599609349502d3b098136d))

## [0.4.0-0](https://github.com/ssube/js-utils/compare/v0.3.0...v0.4.0-0) (2021-07-10)


### ⚠ BREAKING CHANGES

* **maybe:** while the Optional type has been deprecated, some Array
and Maybe-related functions have been renamed to be more consistent.

### Features

* **maybe:** deprecate Optional and Nil types in favor of Maybe and None ([02b9a68](https://github.com/ssube/js-utils/commit/02b9a688e7aeca93ef9b20d4e19cdd08a0c63435))

## [0.3.0](https://github.com/ssube/js-utils/compare/v0.2.1...v0.3.0) (2021-07-10)


### ⚠ BREAKING CHANGES

* **async:** usage of `defer(number, T)` must be replaced with
`deferValue(number, T)`. Uses of `defer(number)` do not need to change.

### Features

* **reflect:** handle missing prototypes ([99f18ae](https://github.com/ssube/js-utils/commit/99f18ae5d19ff167b8391eabcdec18a46eb1cba2))


### Bug Fixes

* reduce renovate noise, automerge test deps ([e35d71e](https://github.com/ssube/js-utils/commit/e35d71ed49dc785d9d2eb9295986608d2a1b239a))
* **async:** split up defer with and without value, update typescript ([1847865](https://github.com/ssube/js-utils/commit/1847865c98dc005e767bd386a09a6288bc4d06b5))
* **buffer:** restrict encodings ([85d7e56](https://github.com/ssube/js-utils/commit/85d7e56d14e3bde6b67423c6372cb344d2795210))
* **build:** pull images from nexus ([5de2472](https://github.com/ssube/js-utils/commit/5de2472fa8b03ab784375055ce807e2663fd2349))

### [0.2.1](https://github.com/ssube/js-utils/compare/v0.2.1-0...v0.2.1) (2020-08-01)

### [0.2.1-0](https://github.com/ssube/js-utils/compare/v0.2.0...v0.2.1-0) (2020-08-01)


### Features

* **list:** add filter many helper ([077d05f](https://github.com/ssube/js-utils/commit/077d05f7c4be31f884e798448d2b805566b7d2d1))
* **map:** normalize helper handles numeric values ([b452bf7](https://github.com/ssube/js-utils/commit/b452bf7caae65d6147b43d5037de8436ac536bbb))


### Bug Fixes

* **build:** add explicit dep on eslint ([cae0432](https://github.com/ssube/js-utils/commit/cae0432e6ec1d53e2b62308621880932a9e05ed1))
* **config:** update lint to naming-convention rule ([8db6b43](https://github.com/ssube/js-utils/commit/8db6b436c7963615b21d948500af8aa5837806e3))

## [0.2.0](https://github.com/ssube/js-utils/compare/v0.2.0-4...v0.2.0) (2020-07-09)

## [0.2.0-4](https://github.com/ssube/js-utils/compare/v0.2.0-3...v0.2.0-4) (2020-07-09)


### Bug Fixes

* clean up polyfill plugins, externalize those modules ([74fe04a](https://github.com/ssube/js-utils/commit/74fe04a9c261cea8d68e0f7bf618e46bda3f9e8a))

## [0.2.0-3](https://github.com/ssube/js-utils/compare/v0.2.0-0...v0.2.0-3) (2020-07-09)


### Bug Fixes

* **build:** externalize lodash ([bf0f337](https://github.com/ssube/js-utils/commit/bf0f3370de293ff50c2c83e938ba1778b583780e))

## [0.2.0-0](https://github.com/ssube/js-utils/compare/v0.1.8...v0.2.0-0) (2020-06-30)


### ⚠ BREAKING CHANGES

* this removes the test helpers, which were not well
tested and required the `async_hooks` module, and the PID file
helpers, which introduced a requirement on `fs` that could not be
easily polyfilled. This should make the library easier to use in
browsers and bundlers.
* **build:** removes the umd module in favor of a smaller, standard
ES module. Consumers will need native support for ES modules (recent
evergreen browsers) or a bundler with the same (rollup, webpack, etc).

### Features

* **build:** bundle as ES module ([040fecc](https://github.com/ssube/js-utils/commit/040fecc6e3b6ac6f9b0c679b6dd294486d8b5258))


### Bug Fixes

* better support for readonly arrays ([a4b8bf2](https://github.com/ssube/js-utils/commit/a4b8bf24b6f50b52c4271d053a3b164581909dee))
* **build:** use full names for exported symbols ([a7cf22d](https://github.com/ssube/js-utils/commit/a7cf22de07311f7bc204f9cba79077d8ac7ca7b1))


### remove

* async test tracker and pid file utils ([e34641a](https://github.com/ssube/js-utils/commit/e34641a42d49599e4862ea7f19c7dd19e48c36b3))

### [0.1.8](https://github.com/ssube/js-utils/compare/v0.1.7...v0.1.8) (2020-05-20)


### Bug Fixes

* remove mock-fs from vendor bundle ([bfbfaca](https://github.com/ssube/js-utils/commit/bfbfaca59d7d15140634fe80ee72b969c5a1f9a3))

### [0.1.7](https://github.com/ssube/js-utils/compare/v0.1.6...v0.1.7) (2020-03-31)


### Features

* **list:** add utils from salty-dog ([3f675aa](https://github.com/ssube/js-utils/commit/3f675aaaa348101522e17415f8ed392ed64816c9))


### Bug Fixes

* **docs:** write a basic readme ([9c5b750](https://github.com/ssube/js-utils/commit/9c5b750c15eebf5997cc5fd537c86eee460ca9c8))

### [0.1.6](https://github.com/ssube/js-utils/compare/v0.1.5...v0.1.6) (2020-03-31)

### [0.1.5](https://github.com/ssube/js-utils/compare/v0.1.4...v0.1.5) (2020-03-31)


### Bug Fixes

* **docs:** describe exports and mark with release status ([e4958ee](https://github.com/ssube/js-utils/commit/e4958ee6f06c54bcb73c089c1000e708fb81983a))
* **logger:** use global instance of console/null logger for tests ([c55e154](https://github.com/ssube/js-utils/commit/c55e154570150947c401be860e3b4e09f10f7fbe))
* **test:** begin covering child process utils ([f690cdc](https://github.com/ssube/js-utils/commit/f690cdcac2ca84de53592265b434bc0658da5c03))
* **test:** cover async, buffer, map, and reflect utils ([852045f](https://github.com/ssube/js-utils/commit/852045f7b1fd70afa19217eaf24f976c3e3baa4a))
* **test:** cover pid file, signal helpers, improve coverage for others ([76e2ba4](https://github.com/ssube/js-utils/commit/76e2ba46ddb5da21c15f04a4d4cb5b0ce80dc6c1))

### [0.1.4](https://github.com/ssube/js-utils/compare/v0.1.3...v0.1.4) (2020-03-29)


### Features

* export async tracker, checklist ([e68d7f9](https://github.com/ssube/js-utils/commit/e68d7f97d2d3e1d942d764c42620b0adb7ab5b1c))

### [0.1.3](https://github.com/ssube/js-utils/compare/v0.1.2...v0.1.3) (2020-03-29)


### Features

* add checklist ([9c9a35c](https://github.com/ssube/js-utils/commit/9c9a35c8294c01f52965a206d1bb254215cba503))
* expose reflect functions ([e530a99](https://github.com/ssube/js-utils/commit/e530a99c31366fd2223e4f35444c37506e3bc95e))

### [0.1.2](https://github.com/ssube/js-utils/compare/v0.1.1...v0.1.2) (2020-03-29)


### Features

* add utils from isolex ([e227fa6](https://github.com/ssube/js-utils/commit/e227fa6691fe0381c9aab86c5d1fcdd121011d9b))

### [0.1.1](https://github.com/ssube/js-utils/compare/v0.2.3...v0.1.1) (2020-03-28)


### Bug Fixes

* **docs:** comment header in PR template ([0372927](https://github.com/ssube/js-utils/commit/0372927e56bbb64624c1709d4b379d66c72a20f4))
* **docs:** remove isolex link in PR template ([21f0699](https://github.com/ssube/js-utils/commit/21f069972e82930f77cd9b704be18fb14ba1ac53))
