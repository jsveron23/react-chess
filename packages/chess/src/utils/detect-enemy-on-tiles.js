import { curry, compose, and, includes, cond, T, always } from 'ramda';
import { detectOpponent } from './detect-opponent';
import { detectPiece } from './detect-piece';
import { removeDirection } from './remove-direction';

/**
 * Detect enemy on the way
 * @param  {Array}   movableTiles
 * @param  {String}  selectedCode
 * @param  {String}  targetCode
 * @param  {String}  tile
 * @return {Boolean}
 */
function detectEnemyOnTiles(movableTiles, selectedCode, targetCode, tile) {
  return compose(
    and(detectOpponent(selectedCode, targetCode)),
    includes(tile),
    cond([
      [detectPiece.Pawn, removeDirection.Vertical(movableTiles)],
      [T, always(movableTiles)],
    ])
  )(selectedCode);
}

const detectEnemyOnTilesCurried = curry(detectEnemyOnTiles);
export { detectEnemyOnTilesCurried as detectEnemyOnTiles };