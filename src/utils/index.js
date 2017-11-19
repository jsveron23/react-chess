import Chess from './Chess'

/**
 * Transform multiple dimensional array to single
 * (flatten for only Chess)
 * @param  {Array} arr
 * @return {Array}
 */
export function flatten (arr) {
  if (arr.length === 0) {
    return arr
  }

  const flattenedArr = arr.reduce((a, b) => a.concat(b))
  const shouldFlattened = flattenedArr.every(f => (typeof f === 'string'))

  if (!shouldFlattened) {
    return flatten(flattenedArr)
  }

  return flattenedArr
}

export { Chess }
