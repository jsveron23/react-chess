import {
  curry,
  compose,
  reduce,
  filter,
  nth,
  flip,
  without,
  difference,
} from 'ramda';
import {
  parseCode,
  convertAxisToTile,
  convertAxisListToTiles,
  findCodeByTile,
  detectMoved,
  detectPiece,
  detectOpponent,
} from '../utils';
import { EnPassantSpot } from '../presets';

/**
 * Get En-passant tile
 * @param  {String} code
 * @param  {Array}  timeline
 * @return {String}
 */
function getEnPassantTile(code, timeline) {
  const { side, rankName } = parseCode(code);
  const isOnTile = EnPassantSpot[side] === rankName;

  if (isOnTile) {
    const [snapshot, ...prevTimeline] = timeline;
    const _detectMovedBy = detectMoved(prevTimeline);
    const _parseCodeBy = compose(parseCode, findCodeByTile(snapshot));
    const _detectOpponent = detectOpponent(code);

    const _candidateTileToCode = (acc, tN) => {
      const { code: cd } = _parseCodeBy(tN);
      const isCandidate = detectPiece.Pawn(cd) && _detectOpponent(cd);

      return isCandidate ? [...acc, cd] : acc;
    };

    const _getRidOfMovedCode = (cd) => {
      const prevTile = convertAxisToTile(cd, [0, -2]);
      const { pKey } = parseCode(cd);

      return !_detectMovedBy(`${pKey}${prevTile}`);
    };

    return compose(
      flip(convertAxisToTile)([0, -1]),
      nth(0),
      filter(_getRidOfMovedCode),
      reduce(_candidateTileToCode, []),
      convertAxisListToTiles(code)
    )([
      [1, 0],
      [-1, 0],
    ]);
  }

  return '';
}

const _getEnPassantTile = curry(getEnPassantTile);

/**
 * Get En-passant tile (after move)
 * @param  {Array}  nextSnapshot
 * @param  {Array}  snapshot
 * @return {String}
 */
_getEnPassantTile.after = curry(function after(nextSnapshot, snapshot) {
  const [beforeCode] = without(nextSnapshot, snapshot);
  const { fileName: bFileName } = parseCode(beforeCode);
  const [afterCode] = difference(nextSnapshot, snapshot);
  const { fileName: aFileName } = parseCode(afterCode);
  const isDiagonalMove = bFileName !== aFileName;
  const noCapture = nextSnapshot.length === snapshot.length;

  if (isDiagonalMove && noCapture) {
    return convertAxisToTile(afterCode, [0, -1]);
  }

  return '';
});

export default _getEnPassantTile;
