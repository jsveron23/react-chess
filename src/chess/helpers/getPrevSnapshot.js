import { compose, curry, map, reverse, prop } from 'ramda'

/**
 * Get previous snapshot
 * @param  {Array} past
 * @return {Array}
 */
function getPrevSnapshot (past) {
  return compose(
    prop(0),
    map((pastIngame) => pastIngame.snapshot),
    reverse
  )(past)
}

export default curry(getPrevSnapshot)
