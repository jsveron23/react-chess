import {
  curry,
  compose,
  filter,
  includes,
  isEmpty,
  head,
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

const _getAttackers = flip(getAttackers);
const _includes = flip(includes);

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
  const _detectMoved = detectMoved(timeline);
  const placedTiles = compose(convertSnapshotToTiles, head)(timeline);
  // Tiles invalid if occupied OR king would be in check there (squares king passes through)
  const _filterInvalidTiles = compose(
    filter(
      anyPass([
        _includes(placedTiles),
        compose(head, _getAttackers(timeline), String, concat(pKey)),
      ])
    ),
    _convertToTiles
  );
  // Tiles invalid if occupied only (squares rook passes through but king does not)
  const _filterOccupiedTiles = compose(
    filter(_includes(placedTiles)),
    _convertToTiles
  );
  const _detectRookMoved = compose(
    _detectMoved,
    concat(`${side}${Rook}`),
    join(''),
    _convertToTiles
  );

  // prettier-ignore
  // d/c: king passes through → check occupation + attack
  // b: only rook passes through → check occupation only
  const invalidLeftTiles = [
    ..._filterInvalidTiles([[-1, 0], [-2, 0]]),
    ..._filterOccupiedTiles([[-3, 0]]),
  ];

  // prettier-ignore
  const invalidRightTiles = _filterInvalidTiles([[1, 0], [2, 0]]);

  const isKingMoved = _detectMoved(code);
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
