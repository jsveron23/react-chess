import { parseCode } from 'chess/es';

const PieceNames = {
  K: 'King',
  Q: 'Queen',
  R: 'Rook',
  B: 'Bishop',
  N: 'Knight',
  P: 'Pawn',
};

const PieceValues = { P: 1, N: 3, B: 3, R: 5, Q: 9, K: 0 };
const DepthNames = { 2: 'Easy', 3: 'Normal', 4: 'Hard' };

/**
 * Return a center-proximity score for a tile.
 * 2 = central four squares, 1 = extended center, 0 = edge.
 * @param {string} tileName - Tile name e.g. 'e4'
 * @return {number}
 */
function getCenterBonus(tileName) {
  const file = tileName.charCodeAt(0) - 97;
  const rank = parseInt(tileName[1]) - 1;
  const isCenter = file >= 2 && file <= 5 && rank >= 2 && rank <= 5;
  const isExtended = file >= 1 && file <= 6 && rank >= 1 && rank <= 6;

  return isCenter ? 2 : isExtended ? 1 : 0;
}

/**
 * Return a human-readable positional reason for moving a piece to a tile.
 * @param {string} piece - Piece letter (P/N/B/R/Q/K)
 * @param {string} tileName - Destination tile e.g. 'f6'
 * @return {string}
 */
function getPositionalReason(piece, tileName) {
  const center = getCenterBonus(tileName);

  switch (piece) {
    case 'P':
      return center >= 2
        ? 'Advancing pawn to control the center.'
        : 'Pawn advance to gain space on the board.';
    case 'N':
      return center >= 2
        ? 'Knight centralized — covers up to 8 squares from here.'
        : 'Knight repositioned to improve mobility.';
    case 'B':
      return 'Bishop developed to control key diagonal lines.';
    case 'R':
      return 'Rook activated — seeking an open or semi-open file.';
    case 'Q':
      return center >= 1
        ? 'Queen centralized to maximize board influence.'
        : 'Queen repositioned for better coordination.';
    case 'K':
      return 'King moves to improve safety or endgame activity.';
    default:
      return 'Positional improvement.';
  }
}

/**
 * Return a human-readable material-balance description for a capture.
 * @param {string} attackerPiece - Piece letter of the capturing piece
 * @param {string|null} capturedPiece - Piece letter of the captured piece
 * @return {string}
 */
function getMaterialAnalysis(attackerPiece, capturedPiece) {
  if (!capturedPiece) return 'Material gain.';
  const atk = PieceValues[attackerPiece] || 0;
  const vic = PieceValues[capturedPiece] || 0;

  if (vic > atk)
    return `Material gain — winning a ${PieceNames[capturedPiece]} with a less valuable piece.`;
  if (vic === atk) return `Equal exchange to simplify the position.`;

  return `Sacrifice — giving up material for a positional or tactical advantage.`;
}

/**
 * Format a move from node array into a readable label.
 * @param {{ node: string[], isCaptured: boolean, pretendCode: string }} move
 * @return {string}
 */
export function formatMoveLabel(move) {
  const { node, isCaptured, pretendCode } = move;
  if (!node || node.length < 2) return '?';

  const toCode = node[node.length - 1];
  const fromCode = node[node.length - 2];
  const { piece: toPiece, tileName } = parseCode(toCode);
  const { piece: fromPiece } = parseCode(fromCode);

  // Castling: King moved 2 files
  const fromFile = fromCode[2];
  const toFile = toCode[2];
  if (fromPiece === 'K' && Math.abs(fromFile.charCodeAt(0) - toFile.charCodeAt(0)) === 2) {
    return toFile < fromFile ? 'O-O-O' : 'O-O';
  }

  // Promotion: piece changed
  const isPromotion = fromPiece === 'P' && toPiece !== 'P';
  const pieceLetter = isPromotion ? toPiece : fromPiece;
  const captureSymbol = isCaptured ? '×' : '→';
  const suffix = isPromotion ? `=${toPiece}` : '';

  if (pieceLetter === 'P') {
    return `${captureSymbol}${tileName}${suffix}`;
  }

  return `${pieceLetter}${captureSymbol}${tileName}${suffix}`;
}

/**
 * Generate analysis points for a CPU move.
 * @param {Object} sideData - Move entry from sheetData
 * @param {number} depth - AI search depth
 * @return {{ title: string, points: string[], thinkingTime: number|null }}
 */
export function analyzeCpuMove(sideData, depth = 3) {
  const { from, to, checkData = {} } = sideData;
  const { isCheck, isCheckmate, isStalemate } = checkData;

  const isMoved = from.length === 1 && to.length === 1;
  const isCaptured = from.length === 2 && to.length === 1;
  const isCastling = from.length === 2 && to.length === 2;

  const destCode = to[0];
  const { piece, side, tileName } = parseCode(destCode);
  const pieceName = PieceNames[piece] || piece;
  const isPromotion = isMoved && parseCode(from[0]).piece !== piece;

  const points = [];

  if (isCheckmate) {
    points.push('Checkmate — the CPU wins the game!');
    points.push("The opponent's king has no legal escape moves.");
  } else if (isStalemate) {
    points.push('Stalemate — the game ends in a draw.');
    points.push('The opponent has no legal moves but is not in check.');
  } else if (isCastling) {
    const rookOld = from.find((c) => parseCode(c).piece === 'R');
    const rookFile = rookOld ? parseCode(rookOld).fileName : null;
    const castleSide = rookFile === 'a' ? 'queenside' : 'kingside';

    points.push(`CPU castles ${castleSide}.`);
    points.push('King safety: king moves behind a pawn shield.');
    points.push('Rook activation: rook enters the game on an open file.');
  } else if (isPromotion) {
    points.push(`Pawn promotes to ${pieceName} on ${tileName}!`);
    points.push(`Major material gain — a Pawn becomes a ${pieceName}.`);
    if (isCheck) points.push('The promoted piece immediately gives check.');
  } else if (isCaptured) {
    const capturedCode = from.find((c) => parseCode(c).side !== side);
    const capturedPiece = capturedCode ? parseCode(capturedCode).piece : null;
    const capturedName = capturedPiece ? PieceNames[capturedPiece] : 'piece';

    points.push(`${pieceName} captures ${capturedName} on ${tileName}.`);
    points.push(getMaterialAnalysis(piece, capturedPiece));
    if (isCheck)
      points.push('This capture also gives check, forcing a response.');
  } else if (isMoved) {
    points.push(`${pieceName} moves to ${tileName}.`);
    points.push(getPositionalReason(piece, tileName));
    if (isCheck)
      points.push("This move gives check, restricting the opponent's options.");
  }

  const difficulty = DepthNames[depth] || 'Normal';

  points.push(`Search depth: ${depth} plies (${difficulty} difficulty).`);

  return {
    title: isCastling ? 'Castling' : `${pieceName} → ${tileName}`,
    points,
    thinkingTime: sideData.thinkingTime,
  };
}
