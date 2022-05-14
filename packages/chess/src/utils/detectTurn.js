import { curry } from 'ramda';
import parseCode from './parseCode';
import validateCode from './validateCode';
import { Turn } from '../presets';

/**
 * Detect turn
 * @param  {String}  turn
 * @param  {String}  code
 * @return {Boolean}
 */
function detectTurn(turn, code) {
  if (!validateCode(code)) {
    throw new TypeError(`invalid (detectTurn) | code: ${code}`);
  }

  const { side } = parseCode(code);

  return turn === Turn[side];
}

export default curry(detectTurn);
