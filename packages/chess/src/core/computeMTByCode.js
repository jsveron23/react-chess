import { compose, flip, prop, map, filter } from 'ramda';
import { convertAxisToTile, parseCode, validateCode } from '../utils';
import { Movement } from '../presets';

/**
 * Compute movable tiles for single piece (without special movement)
 * @param  {String} code
 * @return {Array}
 */
function computeMTByCode(code) {
  if (!validateCode(code)) {
    return [];
  }

  return compose(
    filter(Boolean),
    map(convertAxisToTile(code)),
    flip(prop)(Movement),
    prop('piece'),
    parseCode
  )(code);
}

export default computeMTByCode;
