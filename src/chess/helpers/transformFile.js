import { FILES } from '~/chess/constants'

/**
 * Transform file name as number
 * @param  {string} fileName
 * @return {number}
 */
function transformFile (fileName) {
  const idx = FILES.indexOf(fileName)

  return idx > -1 ? idx + 1 : idx
}

export default transformFile
