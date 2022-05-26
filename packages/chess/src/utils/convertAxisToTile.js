import { curry, cond, T, always, concat, compose, prop } from 'ramda';
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
  const nextFileName = getNextFileByIndex(fileName, x);

  return compose(
    cond([
      [validateTile(nextFileName), compose(concat(nextFileName), String)],
      [T, always('')],
    ]),
    getNextRankByIndex(rankName),
    prop(side)
  )({
    [Side.w]: y,
    [Side.b]: -y,
  });
}

export default curry(convertAxisToTile);
