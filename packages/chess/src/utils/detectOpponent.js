import { curry, equals, compose, prop, flip } from 'ramda';
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
    equals(compose(prop('side'), parseCode)(codeA)),
    flip(prop)(Opponent),
    prop('side'),
    parseCode
  )(codeB);
}

export default curry(detectOpponent);
