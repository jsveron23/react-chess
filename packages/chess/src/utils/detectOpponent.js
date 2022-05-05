import { curry } from 'ramda';
import parseCode from './parseCode';
import { Opponent } from '../presets';

/**
 * Detect opponent side
 * @param  {String}  codeA
 * @param  {String}  codeB
 * @return {Boolean}
 */
function detectOpponent(codeA, codeB) {
  const { side: aSide } = parseCode(codeA);
  const { side: bSide } = parseCode(codeB);

  return aSide === Opponent[bSide];
}

export default curry(detectOpponent);
