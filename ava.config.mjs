export default {
  require: ['@babel/register'],
  files: ['src/**/*.spec.js', 'packages/**/*.spec.js'],
  verbose: true,
  failFast: true,
};
