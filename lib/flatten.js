/**
 * Flatten
 * @param  {Array} arr
 * @return {Array}
 */
function flatten (arr) {
  return [].concat.apply([], arr)
}

module.exports = flatten
