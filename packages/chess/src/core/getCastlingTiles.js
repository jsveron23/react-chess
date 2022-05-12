import {
  curry,
  compose,
  filter,
  includes,
  isEmpty,
  nth,
  join,
  prepend,
  flip,
} from 'ramda';
import findAttacker from './findAttacker';
import {
  parseCode,
  detectMoved,
  convertAxisListToTiles,
  convertSnapshotToTiles,
} from '../utils';
import { Rook } from '../presets';

/**
 * Compute castling (to avoid circular dependency issue)
 * @param  {Array}  timeline
 * @param  {String} code
 * @param  {String} attackerCode
 * @return {Array}
 */
function getCastlingTiles(timeline, code) {
  const { side, pKey } = parseCode(code);
  const convertToTiles = convertAxisListToTiles(code);
  const placedTiles = compose(convertSnapshotToTiles, nth(0))(timeline);
  const detectIncludes = flip(includes)(placedTiles);
  const findPredictAttacker = flip(findAttacker)(timeline);

  const _filterInvalidTiles = (tN) => {
    return detectIncludes(tN) || findPredictAttacker(`${pKey}${tN}`);
  };

  const invalidLeftTiles = compose(
    filter(_filterInvalidTiles),
    convertToTiles
  )([
    [-1, 0],
    [-2, 0],
    [-3, 0],
  ]);

  const invalidRightTiles = compose(
    filter(_filterInvalidTiles),
    convertToTiles
  )([
    [1, 0],
    [2, 0],
  ]);

  const _detectRookMoved = compose(
    detectMoved(timeline),
    join(''),
    prepend(`${side}${Rook}`),
    convertToTiles
  );

  const isKingMoved = detectMoved(timeline, code);
  const isLeftRookMoved = _detectRookMoved([[-4, 0]]);
  const isRightRookMoved = _detectRookMoved([[3, 0]]);
  let castlingTiles = [];

  if (!isKingMoved && !isLeftRookMoved && isEmpty(invalidLeftTiles)) {
    castlingTiles = convertToTiles([[-2, 0]]);
  }

  if (!isKingMoved && !isRightRookMoved && isEmpty(invalidRightTiles)) {
    castlingTiles = [...convertToTiles([[2, 0]]), ...castlingTiles];
  }

  return castlingTiles;
}

export default curry(getCastlingTiles);
