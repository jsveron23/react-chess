import { compose, defaultTo, curry } from 'ramda';
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
    parseCode.prop('pKey'),
    defaultTo(''),
    findCodeByTile(snapshot)
  )(tile);
}

export default curry(getPKeyByTile);
