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
  const _filterInvalidTiles = compose(
    filter(
      anyPass([
        _includes(placedTiles),
        compose(head, _getAttackers(timeline), String, concat(pKey)),
      ])
    ),
    _convertToTiles
  );
  const _detectRookMoved = compose(
    _detectMoved,
    concat(`${side}${Rook}`),
    join(''),
    _convertToTiles
  );

  // prettier-ignore
  const invalidLeftTiles = _filterInvalidTiles([[-1, 0], [-2, 0], [-3, 0]]);

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
