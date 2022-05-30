import { curry, equals, flip, prop, compose } from 'ramda';
import parseCode from './parseCode';
import validateCode from './validateCode';
import { Opponent } from '../presets';

const _prop = flip(prop);
const _getSide = parseCode.prop('side');

/**
 * Detect opponent side
 * @param  {String}  codeA
 * @param  {String}  codeB
 * @return {Boolean}
 */
function detectOpponent(codeA, codeB) {
  if (!validateCode(codeA) || !validateCode(codeB)) {
    return false;
  }

  return compose(equals(_getSide(codeA)), _prop(Opponent), _getSide)(codeB);
}

export default curry(detectOpponent);
