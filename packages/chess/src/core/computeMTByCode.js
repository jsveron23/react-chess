import { compose, flip, prop, map, filter } from 'ramda';
import getNextTile from './getNextTile';
import parseCode from './parseCode';
import validateCode from '../utils/validateCode';
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
