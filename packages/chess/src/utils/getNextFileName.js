import { curry } from 'ramda';
import { File } from '../presets';

function getNextFileName(fileName, x) {
  const fileIdx = File.indexOf(fileName);

  return File[fileIdx + x];
}

export default curry(getNextFileName);
