import { splitTo } from '~/utils'

/**
 * Parse a code of snapshot
 * @param  {string} code
 * @return {Object}
 */
function parseCode (code) {
  return splitTo('', ['side', 'piece', 'file', 'rank'], code)
}

export default parseCode
