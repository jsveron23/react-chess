import { FILES } from '~/chess/constants'

/**
 * Transform file name as number
 * @param  {string} file
 * @return {number}
 */
function transformFile (file) {
  const idx = FILES.indexOf(file)

  return idx > -1 ? idx + 1 : idx
}

export default transformFile
