import { curry } from 'ramda';
import parseCode from './parseCode';
import { Turn } from '../presets';

/**
 * Detect turn
 * @param  {String}  turn
 * @param  {String}  code
 * @return {Boolean}
 */
function detectTurn(turn, code) {
  const { side } = parseCode(code);

  return turn === Turn[side];
}

export default curry(detectTurn);
