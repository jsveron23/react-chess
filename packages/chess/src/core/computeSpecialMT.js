import { curry } from 'ramda';
import {
  // Side,
  Snapshot,
  Special,
  // Castling,
  DoubleStep,
  // EnPassant,
  // Promotion,
} from '../presets';
import findCode from './findCode';
import parseCode from './parseCode';
import getNextTile from './getNextTile';

// TODO only compute special movable tiles
function computeSpecialMT(code) {
  // const [presentSnapshot] = timeline;
  const { piece, tileName } = parseCode(code);
  const mvs = Special[piece];

  // no special
  if (!mvs) {
    return [];
  }

  return mvs.reduce((acc, mvName) => {
    switch (mvName) {
      // case Castling: {
      //   // TODO
      //   break;
      // }

      case DoubleStep: {
        const initCode = findCode(Snapshot, tileName);
        const dbstTile = getNextTile(initCode, [0, 2]);

        return [...acc, dbstTile];
      }

      // case EnPassant: {
      //   // TODO
      //   break;
      // }

      // case Promotion: {
      //   // TODO use it after move
      //   break;
      // }

      default: {
        return acc;
      }
    }
  }, []);
}

export default curry(computeSpecialMT);
