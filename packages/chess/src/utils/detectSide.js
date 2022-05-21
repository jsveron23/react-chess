import { curry, compose, prop, equals } from 'ramda';
import parseCode from './parseCode';
import validateCode from './validateCode';

function detectSide(side, code) {
  if (!validateCode(code)) {
    throw new TypeError('invalid arguments');
  }

  return compose(equals(side), prop('side'), parseCode)(code);
}

export default curry(detectSide);
