import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import reactSvg from 'rollup-plugin-react-svg';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

/** @see {@link https://github.com/reduxjs/redux/blob/master/rollup.config.js} */
function makeExternalPredicate(externalArr) {
  if (externalArr.length === 0) {
    return () => false;
  }

  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);

  return (id) => pattern.test(id);
}

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      dir: 'es',
      format: 'es',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
  ],
  external: makeExternalPredicate([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ]),
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
    }),
    reactSvg(),
    process.env.NODE_ENV === 'production' && uglify(),
  ],
};
