import { compose, prop, defaultTo, curry } from 'ramda';
import parseCode from './parseCode';
import findCodeByTile from './findCodeByTile';

function getPKeyBy(snapshot, tileName) {
  return compose(
    prop('pKey'),
    parseCode,
    defaultTo(''),
    findCodeByTile(snapshot)
  )(tileName);
}

export default curry(getPKeyBy);
