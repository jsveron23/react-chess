import { curry, compose, flip, cond, always, T } from 'ramda';
import { findCode, findCodeByTile, convertAxisToTile } from '../utils';
import { Snapshot } from '../presets';

const _convertToTile = flip(convertAxisToTile);

/**
 * Get double-step tile
 * @param  {String} code
 * @param  {Array}  snapshot
 * @return {String}
 */
function getDoubleStepTile(code, snapshot) {
  return cond([
    [compose(findCodeByTile(snapshot), _convertToTile([0, 1])), always('')],
    [T, compose(_convertToTile([0, 2]), findCode(Snapshot))],
  ])(code);
}

export default curry(getDoubleStepTile);
