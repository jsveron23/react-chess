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
  const rankMap = {
    [Side.w]: y,
    [Side.b]: -y,
  };
  const nextFileName = getNextFileByIndex(fileName, x);
  const nextRankName = getNextRankByIndex(rankName, rankMap[side]);

  if (!validateTile(nextFileName, nextRankName)) {
    return '';
  }

  return `${nextFileName}${nextRankName}`;
}

export default curry(convertAxisToTile);
