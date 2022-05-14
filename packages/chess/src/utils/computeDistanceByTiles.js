import { curry, indexOf, flip, keys, filter, nth, compose } from 'ramda';
import parseTile from './parseTile';
import { File, Rank, Diagonal, Vertical, Horizontal } from '../presets';

const _idxOfF = flip(indexOf)(File);
const _idxOfR = flip(indexOf)(Rank);

/**
 * Compute distance by two different tiles
 * @param  {String} aTile
 * @param  {String} bTile
 * @return {Object}
 */
function computeDistanceByTiles(aTile, bTile) {
  const { fileName: aFn, rankName: aRn } = parseTile(aTile);
  const { fileName: dFn, rankName: dRn } = parseTile(bTile);
  const file = Math.abs(_idxOfF(aFn) - _idxOfF(dFn));
  const rank = Math.abs(_idxOfR(Number(aRn)) - _idxOfR(Number(dRn)));
  const directionMap = {
    [Diagonal]: file === rank,
    [Vertical]: rank > 0 && file === 0,
    [Horizontal]: file > 0 && rank === 0,
  };

  return {
    contact:
      (file === 1 && rank === 1) ||
      (file === 1 && rank === 0) ||
      (file === 0 && rank === 1),
    direction: compose(
      nth(0),
      filter((key) => directionMap[key]),
      keys
    )(directionMap),
    file,
    rank,
  };
}

export default curry(computeDistanceByTiles);
