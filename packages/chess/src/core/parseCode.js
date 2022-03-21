export default function parseCode(code) {
  const [side, piece, fileName, rankName] = code.split('');

  return {
    // for getPiece function
    pKey: side ? `${side}${piece}` : '',

    tileName: `${fileName}${rankName}`,
    side,
    piece,
    fileName,
    rankName,
  };
}
