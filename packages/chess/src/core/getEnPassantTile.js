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
  getNextTile,
  getNextTiles,
  findCodeByTile,
  detectMoved,
} from '../utils';
import { Side, Pawn, Opponent } from '../presets';

function getEnPassantTile(code, timeline) {
  const { side: sSide, rankName: sRankName } = parseCode(code);
  const RANK_SPOT = {
    [Side.w]: 5,
    [Side.b]: 4,
  };

  if (RANK_SPOT[sSide] === Number(sRankName)) {
    const [snapshot, ...prevTimeline] = timeline;
    const findCodeBy = findCodeByTile(snapshot);
    const detectMovedBy = detectMoved(prevTimeline);
    const parseCodeBy = compose(parseCode, findCodeBy);

    const _candidateTileToCode = (acc, tN) => {
      const { side, piece, code: cd } = parseCodeBy(tN);
      const isPawn = piece === Pawn;
      const isEnemy = Opponent[sSide] === side;

      return isPawn && isEnemy ? [...acc, cd] : acc;
    };

    const _getRidOfMovedCode = (cd) => {
      const prevTile = getNextTile(cd, [0, -2]);
      const { pKey } = parseCode(cd);

      return !detectMovedBy(`${pKey}${prevTile}`);
    };

    return compose(
      flip(getNextTile)([0, -1]),
      nth(0),
      filter(_getRidOfMovedCode),
      reduce(_candidateTileToCode, []),
      getNextTiles(code)
    )([
      [1, 0],
      [-1, 0],
    ]);
  }

  return '';
}

const _getEnPassantTile = curry(getEnPassantTile);

_getEnPassantTile.after = curry(function after(nextSnapshot, snapshot) {
  const [beforeCode] = without(nextSnapshot, snapshot);
  const { fileName: bFileName } = parseCode(beforeCode);
  const [afterCode] = difference(nextSnapshot, snapshot);
  const { fileName: aFileName } = parseCode(afterCode);
  const isDiagonalMove = bFileName !== aFileName;
  const noCapture = nextSnapshot.length === snapshot.length;

  if (isDiagonalMove && noCapture) {
    return getNextTile(afterCode, [0, -1]);
  }

  return '';
});

export default _getEnPassantTile;
