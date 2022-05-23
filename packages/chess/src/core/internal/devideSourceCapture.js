import { curry, assoc, always, cond, T } from 'ramda';
import { parseCode } from '../../utils';

// source(what `from` tile from?) and capture
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

export default curry(devideSourceCapture);
