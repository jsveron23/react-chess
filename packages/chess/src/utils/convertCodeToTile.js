import { compose, prop } from 'ramda';
import parseCode from './parseCode';
import validateCode from './validateCode';

/**
 * Convert code to tile
 * @param  {String} code
 * @return {String}
 */
export default function convertCodeToTile(code) {
  if (!validateCode(code)) {
    return [];
  }

  return compose(prop('tileName'), parseCode)(code);
}
