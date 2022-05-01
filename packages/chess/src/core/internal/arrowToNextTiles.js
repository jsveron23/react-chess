import { curry, compose, reduce, keys } from 'ramda';
import getNextTiles from '../getNextTiles';

function arrowToNextTiles(code, arrow) {
  return compose(
    reduce((acc, key) => {
      return {
        ...acc,
        // key => Up, Down, Right, Left...
        [key]: getNextTiles(code, arrow[key]),
      };
    }, {}),
    keys
  )(arrow);
}

export default curry(arrowToNextTiles);
