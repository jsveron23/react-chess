import { curry, equals, flip, prop, compose } from 'ramda';
import parseCode from './parseCode';
import validateCode from './validateCode';
import { Opponent } from '../presets';

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

  return compose(
    equals(parseCode.prop('side', codeA)),
    flip(prop)(Opponent),
    parseCode.prop('side')
  )(codeB);
}

export default curry(detectOpponent);
