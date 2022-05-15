import { curry } from 'ramda';
import getNextFileByIndex from './getNextFileByIndex';
import getNextRankByIndex from './getNextRankByIndex';
import parseCode from './parseCode';
import validateTile from './validateTile';
import validateCode from './validateCode';
import { Side } from '../presets';

/**
 * Convert axis to tile
 * @param  {String} code where piece placed
 * @param  {Array}  axis
 * @return {String}
 */
function convertAxisToTile(code, axis) {
  if (!validateCode(code)) {
    return '';
  }

  const { side, fileName, rankName } = parseCode(code);
  const [x, y] = axis;

  // axis don't care what file name is
  const nextFileName = getNextFileByIndex(fileName, x);
  // but pawn only care what rank name is
  const nextRankName = getNextRankByIndex(rankName, side === Side.w ? y : -y);

  // get rid of outside tile from calculation
  if (!validateTile(nextFileName, nextRankName)) {
    return '';
  }

  return `${nextFileName}${nextRankName}`;
}

export default curry(convertAxisToTile);
