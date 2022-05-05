import { compose, flip } from 'ramda';
import { findCode, convertAxisToTile } from '../utils';
import { Snapshot } from '../presets';

/**
 * Get double-step tile
 * @param  {String} code
 * @return {String}
 */
function getDoubleStepTile(code) {
  return compose(flip(convertAxisToTile)([0, 2]), findCode(Snapshot))(code);
}

export default getDoubleStepTile;
