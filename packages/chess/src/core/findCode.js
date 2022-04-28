import { compose, curry, prop, equals } from 'ramda';
import parseCode from './parseCode';

/**
 * Find code from snapshot array
 * @param  {Array}  snapshot
 * @param  {String} tileName
 * @return {String}
 */
function findCode(snapshot, tileName) {
  const matchTilename = compose(equals(tileName), prop('tileName'), parseCode);

  return snapshot.find(matchTilename);
}

export default curry(findCode);
