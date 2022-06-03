import { curry, map, compose, prepend, flip, filter, equals } from 'ramda';
import { computeRawMT, parseCode, replaceCode, findCodeByTile } from 'chess/es';

const _prepend = flip(prepend);

function generateState(timeline, node, code) {
  const [snapshot] = timeline;
  const { side, pKey } = parseCode(code);

  // already placed same sided pieces
  const detectOwnedTile = compose(
    equals(side),
    parseCode.prop('side'),
    findCodeByTile(snapshot)
  );

  return compose(
    filter(Boolean),
    map((tN) => {
      if (detectOwnedTile(tN)) {
        return;
      }

      const nextCode = `${pKey}${tN}`;

      // TODO
      // move | capture | predict attacker | pawn vertical
      // check | checkmate | stalemate

      // AI.set
      return {
        node: [...node, code, nextCode],
        timeline: compose(
          _prepend(timeline),
          replaceCode(snapshot, code)
        )(nextCode),
        side,
      };
    }),
    computeRawMT(timeline)
  )(code);
}

export default curry(generateState);
