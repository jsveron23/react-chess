import { compose, curry, find } from 'ramda';
import parseCode from './parseCode';

/**
 * Find code by callback
 * @param  {Function} cb
 * @param  {Array}    snapshot
 * @return {String}
 */
function findCodeBy(cb, snapshot) {
  return find(compose(cb, parseCode), snapshot);
}

export default curry(findCodeBy);
