import { curry } from 'ramda';
import getNextFileName from './getNextFileName';
import getNextRankName from './getNextRankName';
import invalidTile from './invalidTile';
import parseCode from './parseCode';

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
  const nextRankName = getNextRankName(rankName, side === 'w' ? y : -y);

  if (invalidTile(nextFileName, nextRankName)) {
    return '';
  }

  return `${nextFileName}${nextRankName}`;
}

export default curry(getNextTile);
