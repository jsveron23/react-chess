import validateCode from './validateCode';

export default function parseCode(code) {
  if (!validateCode(code)) {
    return {};
  }

  const [side, piece, fileName, rankName] = code.split('');

  return {
    // for getPiece function
    pKey: `${side}${piece}`,

    tileName: `${fileName}${rankName}`,
    code,
    side,
    piece,
    fileName,
    rankName,
  };
}
