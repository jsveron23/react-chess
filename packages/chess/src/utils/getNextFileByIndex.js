import { curry } from 'ramda';
import { File } from '../presets';

/**
 * Get next file by index
 * @param  {String} fileName
 * @param  {Number} x
 * @return {String}
 */
function getNextFileByIndex(fileName, x) {
  const fileIdx = File.indexOf(fileName);

  return File[fileIdx + x];
}

export default curry(getNextFileByIndex);
