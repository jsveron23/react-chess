import { curry, map, compose, prepend, flip, filter, equals } from 'ramda';
import {
  computeRawMT,
  getAttackers,
  parseCode,
  replaceCode,
  findCodeByTile,
} from 'chess/es';

const Scores = {
  wP: 100,
  wN: 350,
  wB: 350,
  wR: 525,
  wQ: 1000,
  wK: 10000,
  bP: -100,
  bN: -350,
  bB: -350,
  bR: -525,
  bQ: -1000,
  bK: -10000,
};

function computeState(timeline, node, currCode) {
  const [snapshot] = timeline;
  const { side, pKey } = parseCode(currCode);

  return compose(
    filter(Boolean),
    map((tN) => {
      const code = findCodeByTile(snapshot, tN);
      const { side: tSide, pKey: tPKey } = parseCode(code);
      const isSameSide = equals(tSide, side);

      if (isSameSide) {
        return;
      }

      const nextCode = `${pKey}${tN}`;
      const [attackerCode] = getAttackers(nextCode, timeline);

      if (attackerCode) {
        return;
      }

      let score = 0;

      if (code && !isSameSide) {
        score = Scores[tPKey];
      }

      return {
        node: [...node, currCode, nextCode],
        timeline: compose(
          flip(prepend)(timeline),
          replaceCode(snapshot, currCode)
        )(nextCode),
        side,
        score,
      };
    }),
    computeRawMT(timeline)
  )(currCode);
}

export default curry(computeState);
