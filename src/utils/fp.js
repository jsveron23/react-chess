/**
 * @module utils/fp
 * ================
 */

export const compose = (...fns) => (x) => {
  return fns.reduceRight((v, next) => {
    return next(v)
  }, x)
}

export const pipe = (...fns) => (x) => {
  return fns.reduce((v, f) => {
    return f(v)
  }, x)
}
