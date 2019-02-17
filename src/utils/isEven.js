/**
 * Is even?
 * @param  {number}  v
 * @return {boolean}
 */
function isEven (v) {
  if (typeof v !== 'number') {
    return false
  }

  return v % 2 === 0
}

export default isEven
