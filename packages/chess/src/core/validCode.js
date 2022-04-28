import { File, Rank, Turn, Movement } from '../chess';
import parseCode from './parseCode';

export default function validCode(code) {
  if (code.length !== 4) {
    return false;
  }

  const { side, piece, fileName, rankName } = parseCode(code);

  return (
    !!Turn[side] &&
    Array.isArray(Movement[piece]) &&
    File.indexOf(fileName) > -1 &&
    Rank.indexOf(Number(rankName)) > -1
  );
}
