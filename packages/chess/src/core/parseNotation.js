import { curry, compose, join, prop, equals, nth } from 'ramda';
import { parseCode, getEqualPieces, detectCheck } from '../utils';
import { Pawn, Rook } from '../presets';

const Symbols = {
  capture: 'x',
  check: '+',
  checkmate: '#',
  stalemate: '$',
};

function parseNotation({ check, from, to }) {
  const { isCheckmate, isStalemate } = detectCheck(check);
  const {
    side: tSide,
    piece: tPiece,
    tileName: tTileName,
  } = compose(parseCode, join(''))(to);
  const _seperateFromAndCapture = () => {
    return from.reduce((acc, code) => {
      const isSource = compose(equals(tSide), prop('side'), parseCode)(code);

      return {
        ...acc,
        [isSource ? 'source' : 'capture']: parseCode(code),
      };
    }, {});
  };
  const isMoved = from.length === 1 && to.length === 1;
  const isCaptured = from.length === 2 && to.length === 1;
  const isCastling = from.length === 2 && to.length === 2;
  let checkSymbol = check.from ? Symbols.check : '';
  let notation = '';

  checkSymbol = isCheckmate ? Symbols.checkmate : checkSymbol;
  checkSymbol = isStalemate ? Symbols.stalemate : checkSymbol;

  if (isMoved) {
    notation = `${tPiece}${tTileName}`;

    if (tPiece === Pawn) {
      notation = tTileName;
    }
  } else if (isCaptured) {
    const { source } = _seperateFromAndCapture();
    let prefix = tPiece;
    let suffix = tTileName;

    if (tPiece === Pawn) {
      prefix = source.fileName;
    }

    notation = `${prefix}${Symbols.capture}${suffix}`;
  } else if (isCastling) {
    const fileName = compose(
      prop('fileName'),
      parseCode,
      nth(0),
      getEqualPieces(Rook)
    )(from);
    const castlingMap = {
      h: 'O-O',
      a: 'O-O-O',
    };

    notation = castlingMap[fileName];
  }

  return `${notation}${checkSymbol}`;
}

export default curry(parseNotation);
