import { splitTo } from '~/utils'

/**
 * Parse a code of snapshot
 * @param  {String} code
 * @return {Object}
 */
function parseCode (code) {
  return splitTo('', ['side', 'piece', 'file', 'rank'], code)
}

export default parseCode
