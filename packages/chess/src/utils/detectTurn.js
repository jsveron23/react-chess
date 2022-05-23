import { curry, equals, flip, prop, compose } from 'ramda';
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

  return compose(equals(turn), flip(prop)(Turn), parseCode.prop('side'))(code);
}

export default curry(detectTurn);
