import { curry } from 'ramda';
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

  const { side: aSide } = parseCode(codeA);
  const { side: bSide } = parseCode(codeB);

  return aSide === Opponent[bSide];
}

export default curry(detectOpponent);
