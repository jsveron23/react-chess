import { curry, compose, reduce, flip, filter } from 'ramda';
import {
  Snapshot,
  Special,
  Castling,
  DoubleStep,
  Diagonally,
  // EnPassant,
} from '../presets';
import findCode from './findCode';
import parseCode from './parseCode';
import getNextTiles from './getNextTiles';
import getNextTile from './getNextTile';
import findCodeByTile from './findCodeByTile';

// TODO only compute special movable tiles
function computeSpecialMT(code, timeline) {
  // const [presentSnapshot] = timeline;
  const { piece: sPiece, side: sSide } = parseCode(code);
  const mvs = Special[sPiece];

  // no special
  if (!mvs) {
    return [];
  }

  return compose(
    filter(Boolean),
    reduce((acc, mvName) => {
      switch (mvName) {
        case Castling: {
          // TODO

          return acc;
        }

        case DoubleStep: {
          const tileName = compose(
            flip(getNextTile)([0, 2]),
            findCode(Snapshot)
          )(code);

          return [...acc, tileName];
        }

        // TODO found bug
        case Diagonally: {
          const [snapshot] = timeline;
          const findCodeBy = findCodeByTile(snapshot);
          const capturableTiles = compose(
            reduce((acc, tN) => {
              const { side, tileName } = compose(parseCode, findCodeBy)(tN);

              return sSide !== side ? [...acc, tileName] : acc;
            }, []),
            getNextTiles(code)
          )([
            [1, 1],
            [-1, 1],
          ]);

          return [...acc, ...capturableTiles];
        }

        // case EnPassant: {
        //   // TODO move side
        //   break;
        // }

        default: {
          return acc;
        }
      }
    }, [])
  )(mvs);
}

export default curry(computeSpecialMT);
