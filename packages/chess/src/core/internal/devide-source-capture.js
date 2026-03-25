import { curry, assoc, always, cond, T } from 'ramda';
import { parseCode } from '../../utils';

/**
 * Divide source and capture from code.
 * @param {string} side - Side identifier
 * @param {object} state - Current state object
 * @param {string} code - Piece code
 * @return {object} Updated state
 */
function devideSourceCapture(side, state, code) {
  return assoc(
    cond([
      [parseCode.eq(['side', side]), always('source')],
      [T, always('capture')],
    ])(code),
    parseCode(code),
    state
  );
}

const devideSourceCaptureCurried = curry(devideSourceCapture);
export { devideSourceCaptureCurried as devideSourceCapture };
