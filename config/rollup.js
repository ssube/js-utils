import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import multiEntry from 'rollup-plugin-multi-entry';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import tslint from 'rollup-plugin-tslint';
import typescript from 'rollup-plugin-typescript2';

const namedExports = require('./rollup-named.json');
const metadata = require('../package.json');
const shebang = '#! /usr/bin/env node\n\n';

const bundle = {
	external: [
		'async_hooks',
		'chai',
		'sinon',
	],
	input: [
		'src/index.ts',
		'test/harness.ts',
		'test/**/Test*.ts',
	],
	manualChunks(id) {
		if (id.includes('/test/')) {
			return 'test'
		}

		if (id.includes('/node_modules/')) {
			return 'vendor';
		}

		if (id.includes('/src/index')) {
			return 'index';
		}

		if (id.includes('/src/')) {
			return 'main';
		}
	},
	output: {
		dir: 'out/',
		chunkFileNames: '[name].js',
		entryFileNames: 'entry-[name].js',
		format: 'cjs',
		sourcemap: true,
		banner: () => {
			return ''; // @TODO: return shebang for executable scripts
		},
	},
	plugins: [
		multiEntry(),
		json(),
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
		tslint({
			configuration: './config/tslint.json',
			throwOnError: true,
		}),
		typescript({
			cacheRoot: 'out/cache/rts2',
			rollupCommonJSResolveHack: true,
		}),
	],
};

export default [
	bundle,
];
