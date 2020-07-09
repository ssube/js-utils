# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
