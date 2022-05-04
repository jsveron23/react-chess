import { curry, compose, concat, intersection, flatten } from 'ramda';
import computeMTByCode from './computeMTByCode';
import computeMTByDirection from './computeMTByDirection';
import computeSpecialMT from './computeSpecialMT';
import debug from '../debug';

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

  debug.grp({
    dmt: [
      ['original: ', computeMTByDirection(code, snapshot)],
      ['concat: ', dmt],
    ],

    cmt: [
      ['original: ', computeMTByCode(code)],
      ['concat: ', cmt],
    ],

    smt: [['original: ', smt]],
  });

  return intersection(dmt, cmt);
}

export default curry(computeFinalMT);
