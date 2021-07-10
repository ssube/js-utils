import { join, sep } from 'path';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';
import multiEntry from 'rollup-plugin-multi-entry';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import yaml from 'rollup-plugin-yaml';

const flag_debug = process.env['DEBUG'] === 'TRUE';

const metadata = require('../package.json');

const external = require('./rollup-external.json').names;
const namedExports = require('./rollup-named.json');

const rootPath = process.env['ROOT_PATH'];
const targetPath = process.env['TARGET_PATH'];

const bundle = {
	external,
	input: {
		include: [
			join(rootPath, 'src', 'index.ts'),
			join(rootPath, 'test', 'harness.ts'),
			join(rootPath, 'test', '**', 'Test*.ts'),
		],
	},
	manualChunks(id) {
		if (id.includes(`${sep}test${sep}`)) {
			return 'test';
		}

		if (id.match(/commonjs-external/i) || id.match(/commonjsHelpers/)) {
			return 'vendor';
		}

		if (id.match(/node-resolve:/)) {
			return 'vendor';
		}

		if (id.includes(`chai`) || id.includes(`sinon`) || id.includes('source-map')) {
			return 'test';
		}

		if (id.includes(`${sep}node_modules${sep}`)) {
			return 'vendor';
		}

		if (id.includes(`${sep}src${sep}index`)) {
			return 'index';
		}

		if (id.includes(`${sep}src${sep}`) || id.includes(`${sep}rules${sep}`)) {
			return 'main';
		}

		if (id.includes(process.env['HOME'])) {
			return 'linked';
		}

		if (id.length === 30 && id.match(/^[a-f0-9]+$/)) {
			return 'vendor';
		}

		if (flag_debug) {
			console.log('file does not belong to any chunk:', id);
		}

		return 'nochunk';
	},
	output: {
		dir: targetPath,
		chunkFileNames: '[name].js',
		entryFileNames: 'entry-[name].js',
		exports: 'named',
		format: 'module',
		minifyInternalExports: false,
		sourcemap: true,
	},
	plugins: [
		multiEntry(),
		json(),
		yaml(),
		replace({
			delimiters: ['{{ ', ' }}'],
			values: {
				BUILD_JOB: process.env['CI_JOB_ID'],
				BUILD_RUNNER: process.env['CI_RUNNER_DESCRIPTION'],
				GIT_BRANCH: process.env['CI_COMMIT_REF_SLUG'],
				GIT_COMMIT: process.env['CI_COMMIT_SHA'],
				NODE_VERSION: process.env['NODE_VERSION'],
				PACKAGE_NAME: metadata.name,
				PACKAGE_VERSION: metadata.version,
			},
		}),
		resolve({
			preferBuiltins: true,
		}),
		commonjs({
			namedExports,
		}),
		eslint({
			exclude: [
				join('node_modules', '**'),
				join('src', 'resource'),
				join('src', '**', '*.json'),
				join('src', '**', '*.yml'),
			],
			include: [
				join('src', '**', '*.ts'),
				join('test', '**', '*.ts'),
			],
			throwOnError: true,
			useEslintrc: true,
		}),
		typescript({
			cacheRoot: join(targetPath, 'cache', 'rts2'),
			rollupCommonJSResolveHack: true,
		}),
	],
};

export default [
	bundle,
];
