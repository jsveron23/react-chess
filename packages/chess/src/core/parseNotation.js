import { curry, compose, join, prop, head, reduce, flip } from 'ramda';
import devideSourceCapture from './internal/devideSourceCapture';
import { parseCode, getEqualPieces } from '../utils';
import { Pawn, Rook } from '../presets';

const SymbolsMap = {
  capture: 'x',
  check: '+',
  checkmate: '#',
  stalemate: '$',
};

const CastlingMap = {
  a: 'O-O-O',
  h: 'O-O',
};

const _prop = flip(prop);

/**
 * Parse notation
 * @param  {Object} checkData
 * @param  {Array}  from
 * @param  {Array}  to
 * @return {String}
 */
function parseNotation({
  checkData = {
    isCheck: false,
    isStalemate: false,
    isCheckmate: false,
  },
  from,
  to,
}) {
  const { side, piece, tileName } = compose(parseCode, join(''))(to);
  const isPawn = piece === Pawn;
  const isMoved = from.length === 1 && to.length === 1;
  const isCaptured = from.length === 2 && to.length === 1;
  const isCastling = from.length === 2 && to.length === 2;
  let symbol = checkData.isCheck ? SymbolsMap.check : '';
  let notation = '';

  symbol = checkData.isCheckmate ? SymbolsMap.checkmate : symbol;
  symbol = checkData.isStalemate ? SymbolsMap.stalemate : symbol;

  if (isMoved) {
    notation = `${piece}${tileName}`;

    if (isPawn) {
      notation = tileName;
    }
  } else if (isCaptured) {
    const { source } = reduce(devideSourceCapture(side), {}, from);
    let prefix = piece;
    let suffix = tileName;

    if (isPawn) {
      prefix = source.fileName;
    }

    notation = `${prefix}${SymbolsMap.capture}${suffix}`;
  } else if (isCastling) {
    notation = compose(
      _prop(CastlingMap),
      compose(parseCode.prop('fileName'), head, getEqualPieces(Rook))
    )(from);
  }

  return `${notation}${symbol}`;
}

export default curry(parseNotation);
