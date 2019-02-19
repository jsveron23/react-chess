/**
 * Is even?
 * @param  {number}  num
 * @return {boolean}
 */
function isEven (num) {
  if (typeof num !== 'number') {
    return false
  }

  return num % 2 === 0
}

export default isEven
