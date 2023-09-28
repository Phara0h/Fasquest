import nodePolyfills from 'rollup-plugin-node-polyfills';
import commonjs from '@rollup/plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';

export default {
	input: './index.js',
  plugins: [
     commonjs(),
     nodePolyfills(),
     minify({comments:false})
 ],

	output: {
		file: 'dist/index.mjs',
		format: 'es',
		esModule: false,
		// interop: false,

		exports: 'named',
		// https://github.com/rollup/rollup/issues/1961#issuecomment-534977678
		//intro: 'exports = module.exports = fasquest;'
	}
};
