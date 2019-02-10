import { FILES } from '~/chess/constants'

/**
 * Transform file to x
 * @param  {string} file
 * @return {number}
 */
function transformFileToX (file) {
  const idx = FILES.indexOf(file)

  return idx > -1 ? idx + 1 : idx
}

export default transformFileToX
