# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.2](https://github.com/ssube/rollup-template/compare/v0.2.1...v0.2.2) (2019-11-11)


### Bug Fixes

* **build:** handle unplaced chunks ([504124e](https://github.com/ssube/rollup-template/commit/504124e))
* **build:** omit git from package, ignore pid files ([b10bca3](https://github.com/ssube/rollup-template/commit/b10bca3))
* declare json/yml data as unknown ([dd5b049](https://github.com/ssube/rollup-template/commit/dd5b049))
* gitlab-ci permissions ([26f1fb7](https://github.com/ssube/rollup-template/commit/26f1fb7))
* rename main app method to main, remove redundant wrapper ([0e8ac46](https://github.com/ssube/rollup-template/commit/0e8ac46))
* use index as entry point for run targets ([e2a40e0](https://github.com/ssube/rollup-template/commit/e2a40e0))
* **build:** move index back to its own chunk ([f3b2e9c](https://github.com/ssube/rollup-template/commit/f3b2e9c))
* **build:** use absolute path for rollup output ([9f11653](https://github.com/ssube/rollup-template/commit/9f11653))
* **build:** use absolute paths and windows-friendly chunk tests ([12d4560](https://github.com/ssube/rollup-template/commit/12d4560))
* **build:** use custom docker images with proper build tools ([5ef5735](https://github.com/ssube/rollup-template/commit/5ef5735))
* **lint:** ignore style code ([f051b02](https://github.com/ssube/rollup-template/commit/f051b02))
* declare resource modules ([6be6dcc](https://github.com/ssube/rollup-template/commit/6be6dcc))
* **build:** call project scripts using absolute paths ([38cf602](https://github.com/ssube/rollup-template/commit/38cf602))
* **build:** move docker commands to script, detect project path outside of CI ([d3ccff9](https://github.com/ssube/rollup-template/commit/d3ccff9))
* **docs:** clean up feature list ([65f9bb2](https://github.com/ssube/rollup-template/commit/65f9bb2))
* **docs:** more consistent tense ([139da51](https://github.com/ssube/rollup-template/commit/139da51))
* **docs:** note changelog in features ([329acfc](https://github.com/ssube/rollup-template/commit/329acfc))
* **docs:** note required base64 encoding for secrets ([69ec771](https://github.com/ssube/rollup-template/commit/69ec771))
* **scripts:** escape docker tags ([49ca085](https://github.com/ssube/rollup-template/commit/49ca085))


### Features

* **build:** add alpine image job from salty-dog ([67237ea](https://github.com/ssube/rollup-template/commit/67237ea))
* **build:** add global link target ([f9b1a81](https://github.com/ssube/rollup-template/commit/f9b1a81))
* **build:** add node shebang to index ([b4172bb](https://github.com/ssube/rollup-template/commit/b4172bb))
* **build:** add sonar job ([6d8f716](https://github.com/ssube/rollup-template/commit/6d8f716))
* **build:** bundle json and yaml with TS typedefs ([58d3eee](https://github.com/ssube/rollup-template/commit/58d3eee))
* **build:** externalize rollup data ([49d5c73](https://github.com/ssube/rollup-template/commit/49d5c73))
* **build:** replace tslint with eslint ([f50af4c](https://github.com/ssube/rollup-template/commit/f50af4c))
* include additional makefiles, add example ([15d5e83](https://github.com/ssube/rollup-template/commit/15d5e83))
* **github:** add issue and PR templates ([5a0a808](https://github.com/ssube/rollup-template/commit/5a0a808))
* **scripts:** add project create and sync scripts (fixes [#7](https://github.com/ssube/rollup-template/issues/7)) ([79bc499](https://github.com/ssube/rollup-template/commit/79bc499))
* **scripts:** copy some files into new projects only once ([aae0412](https://github.com/ssube/rollup-template/commit/aae0412))

### [0.2.1](https://github.com/ssube/rollup-template/compare/v0.2.0...v0.2.1) (2019-09-18)


### Bug Fixes

* **build:** pick a unique package name ([309e986](https://github.com/ssube/rollup-template/commit/309e986))
* **docs:** note CC reporter ID ([d61ae9e](https://github.com/ssube/rollup-template/commit/d61ae9e))
* **docs:** note release process ([7592e50](https://github.com/ssube/rollup-template/commit/7592e50))

## 0.2.0 (2019-09-18)


### Bug Fixes

* **build:** add github status script and correct typedef path ([638da80](https://github.com/ssube/rollup-template/commit/638da80))
* **build:** add packages to image before output ([a3dcc98](https://github.com/ssube/rollup-template/commit/a3dcc98))
* **build:** add yarn lock to image before installing, add tmp files to docker ignore ([0db2ec1](https://github.com/ssube/rollup-template/commit/0db2ec1))
* **build:** correct ci includes ([2bdec7e](https://github.com/ssube/rollup-template/commit/2bdec7e))
* **build:** move image tag into script for default ([4c0ef6e](https://github.com/ssube/rollup-template/commit/4c0ef6e))
* **build:** print and quote image tag ([efa5fb7](https://github.com/ssube/rollup-template/commit/efa5fb7))
* **build:** reduce artifact retention ([89eac0d](https://github.com/ssube/rollup-template/commit/89eac0d))
* **docs:** briefly note secrets ([f18e309](https://github.com/ssube/rollup-template/commit/f18e309))
* **test:** spy on global console log ([6591470](https://github.com/ssube/rollup-template/commit/6591470))


### Features

* **build:** add release deps ([f40f648](https://github.com/ssube/rollup-template/commit/f40f648))
* dockerfile for node packages ([c1f792d](https://github.com/ssube/rollup-template/commit/c1f792d))
* **build:** break up template jobs ([27bd2b4](https://github.com/ssube/rollup-template/commit/27bd2b4))
* **bundle:** add version info ([38e0aff](https://github.com/ssube/rollup-template/commit/38e0aff))
* **config:** configure npm to use nexus mirror ([73d380d](https://github.com/ssube/rollup-template/commit/73d380d))
* **docs:** add some badges ([1262c6d](https://github.com/ssube/rollup-template/commit/1262c6d))
* **docs:** write readme ([b5b422c](https://github.com/ssube/rollup-template/commit/b5b422c))
* copy template from other projects ([7766659](https://github.com/ssube/rollup-template/commit/7766659))
