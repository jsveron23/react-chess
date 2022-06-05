import { curry, equals, flip, prop, compose } from 'ramda';
import parseCode from './parseCode';
import validateCode from './validateCode';
import { Turn } from '../presets';

const _prop = flip(prop);

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

  return compose(equals(turn), _prop(Turn), parseCode.prop('side'))(code);
}

export default curry(detectTurn);
