import validateCode from '../utils/validateCode';

export default function parseCode(code) {
  if (!validateCode(code)) {
    return {};
  }

  const [side, piece, fileName, rankName] = code.split('');

  return {
    // for getPiece function
    pKey: `${side}${piece}`,

    tileName: `${fileName}${rankName}`,
    side,
    piece,
    fileName,
    rankName,
  };
}
