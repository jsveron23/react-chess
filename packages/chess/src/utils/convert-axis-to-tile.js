import { curry, cond, T, always, concat, compose, prop } from 'ramda';
import { getNextFileByIndex } from './get-next-file-by-index';
import { getNextRankByIndex } from './get-next-rank-by-index';
import { parseCode } from './parse-code';
import { validateTile } from './validate-tile';
import { validateCode } from './validate-code';
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

const convertAxisToTileCurried = curry(convertAxisToTile);
export { convertAxisToTileCurried as convertAxisToTile };