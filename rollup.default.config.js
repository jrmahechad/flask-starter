import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/js/main.js',
  output: {
    file: 'appengine/static/main.min.temp.js',
    format: 'iife',
    name: 'version',
    plugins: [terser()],
  },
  plugins: [json()],
};
