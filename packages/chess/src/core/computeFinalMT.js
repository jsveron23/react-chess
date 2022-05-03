import { curry, compose, concat, intersection, flatten } from 'ramda';
import computeMTByCode from './computeMTByCode';
import computeMTByDirection from './computeMTByDirection';
import computeSpecialMT from './computeSpecialMT';

// TODO optimize it
// TODO add capture logic
function computeFinalMT(code, timeline) {
  const [snapshot] = timeline;

  // smt will return tiles list
  const smt = computeSpecialMT(code, timeline);
  const _concatMT = compose(flatten, concat(smt));

  // TODO optimize
  // add special tiles for `intersection`
  const dmt = compose(_concatMT, computeMTByDirection(code))(snapshot);
  const cmt = compose(_concatMT, computeMTByCode)(code);

  // console.log('dmt: ', dmt);
  // console.log('cmt: ', cmt);
  // console.log('smt: ', smt);

  // intersection combined mt with
  return intersection(dmt, cmt);
}

export default curry(computeFinalMT);
