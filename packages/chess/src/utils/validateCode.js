import { File, Rank, Turn, Movement } from '../presets';

/**
 * Validate code
 * @param  {String}  code
 * @return {Boolean}
 */
export default function validateCode(code) {
  if (!code || (code && code.length !== 4)) {
    return false;
  }

  const [side, piece, fileName, rankName] = code.split('');

  return (
    !!Turn[side] &&
    Array.isArray(Movement[piece]) &&
    File.indexOf(fileName) > -1 &&
    Rank.indexOf(Number(rankName)) > -1
  );
}
