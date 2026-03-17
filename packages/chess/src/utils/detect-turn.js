import { curry, equals, flip, prop, compose } from 'ramda';
import { parseCode } from './parse-code';
import { validateCode } from './validate-code';
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

const detectTurnCurried = curry(detectTurn);
export { detectTurnCurried as detectTurn };