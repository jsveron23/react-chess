import {
  curry,
  compose,
  reduce,
  filter,
  head,
  T,
  always,
  allPass,
  concat,
  of,
  flip,
  cond,
  not,
  equals,
  without,
  juxt,
  join,
  difference,
  complement,
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
import { Side } from '../presets';

const RANK_SPOT = {
  [Side.w]: 5,
  [Side.b]: 4,
};

const _convertToTiles = flip(convertAxisToTile);

/**
 * Get En-passant tile
 * @param  {String} code
 * @param  {Array}  timeline
 * @return {String}
 */
function getEnPassantTile(code, timeline) {
  const { side, rankName } = parseCode(code);

  if (equals(RANK_SPOT[side], Number(rankName))) {
    const [snapshot, ...prevTimeline] = timeline;

    return compose(
      _convertToTiles([0, -1]),
      head,
      filter(
        compose(
          not,
          detectMoved(prevTimeline),
          join(''),
          juxt([parseCode.prop('pKey'), _convertToTiles([0, -2])])
        ) // get previous code
      ),
      reduce(
        (acc, tN) =>
          compose(
            cond([
              [
                allPass([detectPiece.Pawn, detectOpponent(code)]),
                compose(concat(acc), of),
              ],
              [T, always(acc)],
            ]),
            findCodeByTile(snapshot)
          )(tN),
        []
      ),
      convertAxisListToTiles(code)
    )([
      [1, 0],
      [-1, 0],
    ]);
  }

  return '';
}

const _getEnPassantTile = curry(getEnPassantTile);
const _getFileName = parseCode.prop('fileName');

/**
 * Get En-passant tile (after move)
 * @param  {Array}  nextSnapshot
 * @param  {Array}  snapshot
 * @return {String}
 */
_getEnPassantTile.after = curry(function after(nextSnapshot, snapshot) {
  const [beforeCode] = without(nextSnapshot, snapshot);
  const [afterCode] = difference(nextSnapshot, snapshot);
  const isDiagonalMove = complement(equals)(
    _getFileName(beforeCode),
    _getFileName(afterCode)
  );
  const noCapture = nextSnapshot.length === snapshot.length;

  if (isDiagonalMove && noCapture) {
    return convertAxisToTile(afterCode, [0, -1]);
  }

  return '';
});

export default _getEnPassantTile;
