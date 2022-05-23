import { curry } from 'ramda';
import parseTile from './parseTile';
import subInBetweenIndexes from './subInBetweenIndexes';
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
    file: Math.abs(subInBetweenIndexes(aFn, dFn, File)),
    rank: Math.abs(subInBetweenIndexes(Number(aRn), Number(dRn), Rank)),
  };
}

export default curry(getTilesDifference);
