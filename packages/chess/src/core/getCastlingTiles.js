import {
  curry,
  compose,
  filter,
  includes,
  isEmpty,
  join,
  prepend,
  flip,
  of,
  anyPass,
  concat,
  nth,
} from 'ramda';
import findAttackers from './findAttackers';
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
 * @return {Array}
 */
function getCastlingTiles(timeline, code) {
  const [snapshot] = timeline;
  const { side, pKey } = parseCode(code);
  const _convertToTiles = convertAxisListToTiles(code);
  const placedTiles = convertSnapshotToTiles(snapshot);

  // pretend castling tiles as piece
  // and checking who possible to attack that tile
  // also checking whethere blocked or not
  const _filterInvalidTiles = compose(
    filter(
      anyPass([
        flip(includes)(placedTiles),
        compose(
          nth(0),
          flip(findAttackers)(timeline),
          join(''),
          prepend(pKey),
          of
        ),
      ])
    ),
    _convertToTiles
  );

  // check Rook whether moved or not
  const _detectRookMoved = compose(
    detectMoved(timeline),
    join(''),
    prepend(`${side}${Rook}`),
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

  if (!isKingMoved && !isLeftRookMoved && isEmpty(invalidLeftTiles)) {
    castlingTiles = _convertToTiles([[-2, 0]]);
  }

  if (!isKingMoved && !isRightRookMoved && isEmpty(invalidRightTiles)) {
    castlingTiles = concat(_convertToTiles([[2, 0]]), castlingTiles);
  }

  return castlingTiles;
}

export default curry(getCastlingTiles);
