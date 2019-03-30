import { FILES } from '../constants'

/**
 * Convert file to x
 * @param  {String} file
 * @return {Number}
 */
function convertFileToX (file) {
  const fileIdx = FILES.indexOf(file)

  if (fileIdx === -1) {
    return -1
  }

  return fileIdx + 1
}

export default convertFileToX
