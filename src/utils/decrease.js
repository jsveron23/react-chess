import * as R from 'ramda'

/**
 * Simple decrease
 * @param  {Number} from
 * @param  {Number} to
 * @return {Array}
 */
function decrease (from, to) {
  let list = []

  for (let i = from; i > to; i--) {
    list = [...list, i]
  }

  return list
}

export default R.curry(decrease)
