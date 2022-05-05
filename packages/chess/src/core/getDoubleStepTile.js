import { compose, flip } from 'ramda';
import { findCode, getNextTile } from '../utils';
import { Snapshot } from '../presets';

function getDoubleStepTile(code) {
  return compose(flip(getNextTile)([0, 2]), findCode(Snapshot))(code);
}

export default getDoubleStepTile;
