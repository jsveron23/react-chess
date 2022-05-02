import { curry, compose, concat, intersection } from 'ramda';
import computeMTByCode from './computeMTByCode';
import computeMTByDirection from './computeMTByDirection';
import computeSpecialMT from './computeSpecialMT';

// TODO optimize it
function computeFinalMT(code, timeline) {
  const [snapshot] = timeline;

  // TODO add capture logic
  return compose(
    // intersection combined mt with
    intersection(computeMTByDirection(code, snapshot)),

    // compute special movement
    concat(computeSpecialMT(code)),

    // compute mt with code(movement of piece)
    computeMTByCode
  )(code);
}

export default curry(computeFinalMT);
