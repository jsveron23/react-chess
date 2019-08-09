import { isEmpty } from '~/utils'

/**
 * Combine text
 * @param  {...String} [...args]
 * @return {String}
 */
function combineTxt (...args) {
  if (isEmpty.or(...args)) {
    return ''
  }

  return ''.concat(...args)
}

export default combineTxt
