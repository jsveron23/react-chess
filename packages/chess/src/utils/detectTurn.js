import { curry, compose, equals, prop, flip } from 'ramda';
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
    throw new TypeError('invalid arguments');
  }

  return compose(equals(turn), flip(prop)(Turn), prop('side'), parseCode)(code);
}

export default curry(detectTurn);
