import { curry, compose, nth, map, of, flip } from 'ramda';
import {
  // Side,
  Snapshot,
  Special,
  // Castling,
  DoubleStep,
  // EnPassant,
} from '../presets';
import findCode from './findCode';
import parseCode from './parseCode';
import getNextTile from './getNextTile';

// TODO only compute special movable tiles
function computeSpecialMT(code) {
  // const [presentSnapshot] = timeline;
  const { piece } = parseCode(code);
  const mvs = Special[piece];

  // no special
  if (!mvs) {
    return [];
  }

  return compose(
    nth(0),
    map((mvName) => {
      switch (mvName) {
        // case Castling: {
        //   // TODO
        //   break;
        // }

        case DoubleStep: {
          return compose(
            of,
            flip(getNextTile)([0, 2]),
            findCode(Snapshot)
          )(code);
        }

        // case EnPassant: {
        //   // TODO move side
        //   break;
        // }

        default:
      }
    })
  )(mvs);
}

export default curry(computeSpecialMT);
