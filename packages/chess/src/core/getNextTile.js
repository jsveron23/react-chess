import { curry } from 'ramda';
import getNextFileName from './getNextFileName';
import getNextRankName from './getNextRankName';
import parseCode from './parseCode';
import validateTile from '../utils/validateTile';
import { Side } from '../presets';

/**
 * Get next tile from where piece stands
 * @param  {String}  code
 * @param  {Array}   axis
 * @return {String*}
 */
function getNextTile(code, axis) {
  const { side, fileName, rankName } = parseCode(code);
  const [x, y] = axis;
  const nextFileName = getNextFileName(fileName, x);
  const nextRankName = getNextRankName(rankName, side === Side.w ? y : -y);

  if (!validateTile(nextFileName, nextRankName)) {
    return '';
  }

  return `${nextFileName}${nextRankName}`;
}

export default curry(getNextTile);
