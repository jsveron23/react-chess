import {
  curry,
  compose,
  join,
  prop,
  equals,
  nth,
  assoc,
  reduce,
  flip,
} from 'ramda';
import { parseCode, getEqualPieces, detectCheck } from '../utils';
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

// source(what `from` tile from?) and capture
const _clearlySeparate = curry(function _clearlySeparate(side, acc, code) {
  const key = compose(equals(side), prop('side'), parseCode)(code)
    ? 'source'
    : 'capture';
  const val = parseCode(code);

  return assoc(key, val, acc);
});

function _getCurrRookFileName(from) {
  return compose(
    prop('fileName'),
    parseCode,
    nth(0),
    getEqualPieces(Rook)
  )(from);
}

function parseNotation({ check, from, to }) {
  const { isCheck, isCheckmate, isStalemate } = detectCheck(check);
  const { side, piece, tileName } = compose(parseCode, join(''))(to);
  const isPawn = piece === Pawn;
  const isMoved = from.length === 1 && to.length === 1;
  const isCaptured = from.length === 2 && to.length === 1;
  const isCastling = from.length === 2 && to.length === 2;
  let symbol = isCheck ? SymbolsMap.check : '';
  let notation = '';

  symbol = isCheckmate ? SymbolsMap.checkmate : symbol;
  symbol = isStalemate ? SymbolsMap.stalemate : symbol;

  if (isMoved) {
    notation = `${piece}${tileName}`;

    if (isPawn) {
      notation = tileName;
    }
  } else if (isCaptured) {
    const { source } = reduce(_clearlySeparate(side), {}, from);
    let prefix = piece;
    let suffix = tileName;

    if (isPawn) {
      prefix = source.fileName;
    }

    notation = `${prefix}${SymbolsMap.capture}${suffix}`;
  } else if (isCastling) {
    notation = compose(flip(prop)(CastlingMap), _getCurrRookFileName)(from);
  }

  return `${notation}${symbol}`;
}

export default curry(parseNotation);
