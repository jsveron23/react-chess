import {
  curry,
  compose,
  filter,
  includes,
  isEmpty,
  complement,
  nth,
  toString,
  flip,
  anyPass,
  concat,
  join,
} from 'ramda';
import getAttackers from './getAttackers';
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
  const _convertToTiles = convertAxisListToTiles(code);
  const placedTiles = compose(convertSnapshotToTiles, nth(0))(timeline);
  const _detectIncludes = flip(includes)(placedTiles);
  const _filterInvalidTiles = compose(
    filter(
      anyPass([
        _detectIncludes,
        compose(
          complement(isEmpty),
          flip(getAttackers)(timeline),
          toString,
          concat(pKey)
        ),
      ])
    ),
    _convertToTiles
  );
  const _detectRookMoved = compose(
    detectMoved(timeline),
    concat(`${side}${Rook}`),
    join(''),
    _convertToTiles
  );

  // prettier-ignore
  const invalidLeftTiles = _filterInvalidTiles([[-1, 0], [-2, 0], [-3, 0]]);

  // prettier-ignore
  const invalidRightTiles = _filterInvalidTiles([[1, 0], [2, 0]]);

  const isKingMoved = detectMoved(timeline, code);
  const isLeftRookMoved = _detectRookMoved([[-4, 0]]);
  const isRightRookMoved = _detectRookMoved([[3, 0]]);
  let castlingTiles = [];

  if (!isKingMoved) {
    if (!isLeftRookMoved && isEmpty(invalidLeftTiles)) {
      castlingTiles = _convertToTiles([[-2, 0]]);
    }

    if (!isRightRookMoved && isEmpty(invalidRightTiles)) {
      castlingTiles = concat(_convertToTiles([[2, 0]]), castlingTiles);
    }
  }

  return castlingTiles;
}

export default curry(getCastlingTiles);
