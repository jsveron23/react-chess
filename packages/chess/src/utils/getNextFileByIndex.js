import { curry, compose, prop, flip, add, indexOf } from 'ramda';
import { File } from '../presets';

/**
 * Get next file by index
 * @param  {String} fileName
 * @param  {Number} x
 * @return {String}
 */
function getNextFileByIndex(fileName, x) {
  return compose(flip(prop)(File), add(x), indexOf(fileName))(File);
}

export default curry(getNextFileByIndex);
