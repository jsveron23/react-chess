/**
 * Simple RegExp creation
 * @param  {String} txt
 * @return {RegExp}
 */
function createRe (txt) {
  return new RegExp(txt)
}

module.exports = createRe
