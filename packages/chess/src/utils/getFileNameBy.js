import { curry } from 'ramda';
import { File } from '../presets';

/**
 * Get filename by index
 * @param  {String} fileName
 * @param  {Number} x
 * @return {String}
 */
function getFileNameBy(fileName, x) {
  const fileIdx = File.indexOf(fileName);

  return File[fileIdx + x];
}

export default curry(getFileNameBy);