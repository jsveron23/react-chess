import { compose, flip, prop, map, filter } from 'ramda';
import getNextTile from './getNextTile';
import parseCode from './parseCode';
import { Movement } from '../chess';

function computeMovableTiles(code) {
  return compose(
    filter(Boolean),
    map(getNextTile(code)),
    flip(prop)(Movement),
    prop('piece'),
    parseCode
  )(code);
}

export default computeMovableTiles;
