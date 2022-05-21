import { curry, assoc } from 'ramda';
import { detectSide, parseCode } from '../../utils';

// source(what `from` tile from?) and capture
function devideSourceCapture(side, acc, code) {
  return assoc(
    detectSide(side, code) ? 'source' : 'capture', // key
    parseCode(code), // val
    acc
  );
}

export default curry(devideSourceCapture);
