import {
  curry,
  compose,
  flip,
  reduce,
  isEmpty,
  nth,
  map,
  prop,
  uniq,
  flatten,
  intersection,
} from 'ramda';
import computeFinalMT from './computeFinalMT';
import { filterOpponent } from '../utils';

function getDefenders(code, movableTiles, timeline) {
  const group = compose(
    reduce((acc, cd) => {
      const defendableTiles = compose(
        intersection(movableTiles),
        flip(computeFinalMT)(timeline)
      )(cd);

      if (isEmpty(defendableTiles)) {
        return acc;
      }

      return [
        ...acc,
        {
          code: cd, // defender
          defendableTiles,
        },
      ];
    }, []),
    filterOpponent(code),
    nth(0)
  )(timeline);

  return {
    defenders: map(prop('code'), group),

    // TODO if none => checkmate
    tiles: compose(uniq, flatten, map(prop('defendableTiles')))(group),
  };
}

export default curry(getDefenders);