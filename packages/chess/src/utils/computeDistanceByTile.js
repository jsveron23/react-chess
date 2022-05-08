import { curry, indexOf, flip } from 'ramda';
import parseTile from './parseTile';
import { File, Rank } from '../presets';

const _idxOfF = flip(indexOf)(File);
const _idxOfR = flip(indexOf)(Rank);

/**
 * Compute distance by tile
 * @param  {String} aTile
 * @param  {String} bTile
 * @return {Object}
 */
function computeDistanceByTile(aTile, bTile) {
  const { fileName: aFn, rankName: aRn } = parseTile(aTile);
  const { fileName: dFn, rankName: dRn } = parseTile(bTile);

  return {
    file: Math.abs(_idxOfF(aFn) - _idxOfF(dFn)),
    rank: Math.abs(_idxOfR(Number(aRn)) - _idxOfR(Number(dRn))),
  };
}

export default curry(computeDistanceByTile);
