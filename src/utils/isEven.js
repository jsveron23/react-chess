/**
 * Is even number?
 * @param  {Number}  num
 * @return {Boolean}
 */
function isEven (num) {
  if (typeof num !== 'number') {
    throw new Error('This is not number!')
  }

  return num % 2 === 0
}

export default isEven
