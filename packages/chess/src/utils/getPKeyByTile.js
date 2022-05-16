import { compose, prop, defaultTo, curry } from 'ramda';
import parseCode from './parseCode';
import findCodeByTile from './findCodeByTile';

/**
 * Get pKey by tile
 * @param  {Array}  snapshot
 * @param  {String} tile
 * @return {String}
 */
function getPKeyByTile(snapshot, tile) {
  return compose(
    prop('pKey'),
    parseCode,
    defaultTo(''),
    findCodeByTile(snapshot)
  )(tile);
}

export default curry(getPKeyByTile);
