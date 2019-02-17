import { FILES } from '~/chess/constants'

/**
 * Convert file to x
 * @param  {string} file
 * @return {number}
 */
function convertFileToX (file) {
  const idx = FILES.indexOf(file)

  return idx > -1 ? idx + 1 : idx
}

export default convertFileToX
