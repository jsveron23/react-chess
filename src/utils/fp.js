const _noop = function () {}

/**
 * Composing functions
 * @param  {...Functions} fns
 * @return {*}
 */
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x)

/**
 * Pipe is can be making compose function easier to read
 * @param  {...Function} fns
 * @return {*}
 */
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

/**
 * Pass argument to next function from object
 * @param  {string} key
 * @return {Object}
 */
const toss = (key) => (x) => x[key]

/**
 * Apply single variable to arguments of function
 * @param  {...Function} fns
 * @return {*}
 */
const pass = (...fns) => (x) => fns.reduce((v, f = _noop) => [...v, f(x)], [])
const apply = (x) => (...fns) => pass(...fns)(x)

/**
 * Trace variable in composition stream
 * @param  {string} label
 * @param  {*}      x
 * @return {*}
 */
const trace = (label) => (x) => {
  console.log(`${label}: `, x)

  return x
}

export {
  compose,
  pipe,
  toss,
  pass,
  apply,
  trace
}
