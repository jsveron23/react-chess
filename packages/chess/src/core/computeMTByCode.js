import { compose, flip, prop, map, filter } from 'ramda';
import { getNextTile, parseCode, validateCode } from '../utils';
import { Movement } from '../presets';

function computeMTByCode(code) {
  if (!validateCode(code)) {
    return [];
  }

  return compose(
    filter(Boolean),
    map(getNextTile(code)),
    flip(prop)(Movement),
    prop('piece'),
    parseCode
  )(code);
}

export default computeMTByCode;
