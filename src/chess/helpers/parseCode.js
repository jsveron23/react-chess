import { isEmpty, merge } from '~/utils'

/**
 * Parse a code of snapshot
 * @param  {String} code
 * @return {Object}
 */
function parseCode (code) {
  if (isEmpty(code)) {
    return {}
  }

  const splittedCode = code.split('')
  const [side, piece, file, rank] = splittedCode
  const tile = merge.txt(file, rank)

  return { side, piece, file, rank, tile, code }
}

export default parseCode
