import { compose, prop, defaultTo, curry } from 'ramda';
import parseCode from './parseCode';
import findCodeByTile from './findCodeByTile';

/**
 * Get pKey by tile
 * @param  {Array}  snapshot
 * @param  {String} tileName
 * @return {String}
 */
function getPKeyByTile(snapshot, tileName) {
  return compose(
    prop('pKey'),
    parseCode,
    defaultTo(''),
    findCodeByTile(snapshot)
  )(tileName);
}

export default curry(getPKeyByTile);
