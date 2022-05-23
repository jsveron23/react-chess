import {
  curry,
  compose,
  reduce,
  filter,
  nth,
  T,
  always,
  allPass,
  concat,
  of,
  flip,
  cond,
  prop,
  not,
  equals,
  without,
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
    const _detectMovedBy = detectMoved(prevTimeline);
    const _parseCodeBy = compose(parseCode, findCodeByTile(snapshot));

    return compose(
      flip(convertAxisToTile)([0, -1]),
      nth(0),
      filter((cd) => {
        const prevTile = convertAxisToTile(cd, [0, -2]);
        const pKey = parseCode.prop('pKey', cd);

        return compose(not, _detectMovedBy)(`${pKey}${prevTile}`);
      }),
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
            prop('code'),
            _parseCodeBy
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
    parseCode.prop('fileName', beforeCode),
    parseCode.prop('fileName', afterCode)
  );
  const noCapture = nextSnapshot.length === snapshot.length;

  if (isDiagonalMove && noCapture) {
    return convertAxisToTile(afterCode, [0, -1]);
  }

  return '';
});

export default _getEnPassantTile;
