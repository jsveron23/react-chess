import { compose, curry, equals, prop, filter } from 'ramda';
import filterOpponent from './filterOpponent';
import parseCode from './parseCode';

/**
 * Get pieces from opponent side
 * @param  {String} piece
 * @param  {String} code
 * @param  {Array} snapshot
 * @return {Array}
 */
function getOppntCodeList(piece, code, snapshot) {
  return compose(
    filter(compose(equals(piece), prop('piece'), parseCode)),
    filterOpponent(code)
  )(snapshot);
}

export default curry(getOppntCodeList);
