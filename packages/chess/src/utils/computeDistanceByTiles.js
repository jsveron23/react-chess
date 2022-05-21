import { curry, compose } from 'ramda';
import parseTile from './parseTile';
import detectContacted from './detectContacted';
import getDirection from './getDirection';
import getSubtraction from './getSubtraction';
import { File, Rank } from '../presets';

/**
 * Compute distance by two different tiles
 * @param  {String} tileA
 * @param  {String} tileB
 * @return {Object}
 */
function computeDistanceByTiles(tileA, tileB) {
  const { fileName: aFn, rankName: aRn } = parseTile(tileA);
  const { fileName: dFn, rankName: dRn } = parseTile(tileB);
  const file = compose(Math.abs, getSubtraction(aFn, dFn))(File);
  const rank = compose(Math.abs, getSubtraction(aRn, dRn))(Rank);

  return {
    contact: detectContacted(file, rank),
    ...getDirection(file, rank),
    file,
    rank,
  };
}

export default curry(computeDistanceByTiles);
