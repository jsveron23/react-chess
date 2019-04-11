import * as R from 'ramda'

/**
 * Simple increase
 * @param  {Number} from
 * @param  {Number} to
 * @return {Array}
 */
function increase (from, to) {
  let list = []

  for (let i = from; i < to; i++) {
    list = [...list, i]
  }

  return list
}

export default R.curry(increase)
