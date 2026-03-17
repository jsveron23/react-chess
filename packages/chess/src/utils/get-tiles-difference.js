import { curry, compose } from 'ramda';
import { parseTile } from './parse-tile';
import { subInBetweenIndexes } from './sub-in-between-indexes';
import { File, Rank } from '../presets';

/**
 * Get tiles difference
 * @param  {String} tileA
 * @param  {String} tileB
 * @return {Object} indexes
 */
function getTilesDifference(tileA, tileB) {
  const { fileName: aFn, rankName: aRn } = parseTile(tileA);
  const { fileName: dFn, rankName: dRn } = parseTile(tileB);

  return {
    file: compose(Math.abs, subInBetweenIndexes(aFn, dFn))(File),
    rank: compose(
      Math.abs,
      subInBetweenIndexes(Number(aRn), Number(dRn))
    )(Rank),
  };
}

const getTilesDifferenceCurried = curry(getTilesDifference);
export { getTilesDifferenceCurried as getTilesDifference };