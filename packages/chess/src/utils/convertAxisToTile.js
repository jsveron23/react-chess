import { curry } from 'ramda';
import getFileNameBy from './getFileNameBy';
import getRankNameBy from './getRankNameBy';
import parseCode from './parseCode';
import validateTile from './validateTile';
import { Side } from '../presets';

/**
 * Convert axis to tile
 * @param  {String} code where piece placed
 * @param  {Array}  axis
 * @return {String}
 */
function convertAxisToTile(code, axis) {
  const { side, fileName, rankName } = parseCode(code);
  const [x, y] = axis;

  // axis don't care what file name is
  const nextFileName = getFileNameBy(fileName, x);
  // but pawn only care what rank name is
  const nextRankName = getRankNameBy(rankName, side === Side.w ? y : -y);

  // get rid of outside tile from calculation
  if (!validateTile(nextFileName, nextRankName)) {
    return '';
  }

  return `${nextFileName}${nextRankName}`;
}

export default curry(convertAxisToTile);
