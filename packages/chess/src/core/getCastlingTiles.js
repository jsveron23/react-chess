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
  append,
  of,
  anyPass,
  concat,
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
 * Get castling tiles (to avoid circular dependency issue)
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
  const _filterInvalidTiles = compose(
    filter(
      anyPass([
        detectIncludes,
        compose(flip(findAttacker)(timeline), join(''), append(pKey), of),
      ])
    ),
    convertToTiles
  );
  const _detectRookMoved = compose(
    detectMoved(timeline),
    join(''),
    prepend(`${side}${Rook}`),
    convertToTiles
  );

  // prettier-ignore
  const invalidLeftTiles = _filterInvalidTiles([[-1, 0], [-2, 0], [-3, 0]]);

  // prettier-ignore
  const invalidRightTiles = _filterInvalidTiles([[1, 0], [2, 0]]);

  const isKingMoved = detectMoved(timeline, code);
  const isLeftRookMoved = _detectRookMoved([[-4, 0]]);
  const isRightRookMoved = _detectRookMoved([[3, 0]]);
  let castlingTiles = [];

  if (!isKingMoved && !isLeftRookMoved && isEmpty(invalidLeftTiles)) {
    castlingTiles = convertToTiles([[-2, 0]]);
  }

  if (!isKingMoved && !isRightRookMoved && isEmpty(invalidRightTiles)) {
    castlingTiles = concat(convertToTiles([[2, 0]]), castlingTiles);
  }

  return castlingTiles;
}

export default curry(getCastlingTiles);
