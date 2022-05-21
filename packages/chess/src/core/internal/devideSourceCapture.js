import { curry, assoc } from 'ramda';
import { detectSide, parseCode } from '../../utils';

// source(what `from` tile from?) and capture
function devideSourceCapture(side, acc, code) {
  const key = detectSide(side, code) ? 'source' : 'capture';
  const val = parseCode(code);

  return assoc(key, val, acc);
}

export default curry(devideSourceCapture);
