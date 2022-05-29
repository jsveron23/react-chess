import { compose, flip } from 'ramda';
import { findCode, convertAxisToTile } from '../utils';
import { Snapshot } from '../presets';

const _convertToTile = flip(convertAxisToTile);

/**
 * Get double-step tile
 * @param  {String} code
 * @return {String}
 */
function getDoubleStepTile(code) {
  return compose(_convertToTile([0, 2]), findCode(Snapshot))(code);
}

export default getDoubleStepTile;
