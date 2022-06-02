import { curry, map, compose, isEmpty, filter } from 'ramda';
import {
  King,
  Queen,
  Rook,
  Bishop,
  Knight,
  Pawn,
  computeRawMT,
  parseCode,
  findCodeByTile,
  replaceCode,
} from 'chess/es';

const Scores = {
  [Pawn]: 100,
  [Knight]: 350,
  [Bishop]: 350,
  [Rook]: 525,
  [Queen]: 1000,
  [King]: 10000,
};

function predictScore(timeline, node, currCode) {
  const [snapshot] = timeline;
  const { side, pKey } = parseCode(currCode);
  const _getSide = parseCode.eq(['side', side]);
  const _findCode = findCodeByTile(snapshot);
  const _updateTimeline = (nextCode) => {
    return [replaceCode(snapshot, currCode, nextCode), ...timeline];
  };

  return compose(
    filter(({ timeline }) => !isEmpty(timeline)),
    map((tN) => {
      const code = _findCode(tN);
      const nextCode = `${pKey}${tN}`;
      let score = 0;
      let nextTimeline = _updateTimeline(nextCode);

      if (code) {
        if (!_getSide(code)) {
          const piece = parseCode.prop('piece', code);

          score = Scores[piece];
        } else {
          nextTimeline = [];
        }
      }

      return {
        node: [...node, currCode, nextCode],
        timeline: nextTimeline,
        side,
        score,
      };
    }),
    computeRawMT(timeline)
  )(currCode);
}

export default curry(predictScore);
