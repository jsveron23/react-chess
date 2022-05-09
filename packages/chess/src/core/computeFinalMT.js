import { curry, compose, concat, intersection, flatten, nth } from 'ramda';
import computeMTByCode from './computeMTByCode';
import computeMTByDirection from './computeMTByDirection';
import computeSpecialMT from './computeSpecialMT';
// import debug from '../debug';

/**
 * Compute final movable tiles
 * @param  {Array}  timeline
 * @param  {String} code
 * @return {Array}
 */
function computeFinalMT(timeline, code) {
  const smt = computeSpecialMT(code, timeline);
  const _concatMT = compose(flatten, concat(smt));
  const dmt = compose(_concatMT, computeMTByDirection(code), nth(0))(timeline);
  const cmt = compose(_concatMT, computeMTByCode)(code);

  // debug.grp(
  //   {
  //     dmt: [
  //       ['original: ', computeMTByDirection(code, snapshot)],
  //       ['concat: ', dmt],
  //     ],
  //
  //     cmt: [
  //       ['original: ', computeMTByCode(code)],
  //       ['concat: ', cmt],
  //     ],
  //
  //     smt: [['original: ', smt]],
  //   },
  //   { collapsed: true },
  //   `Movable tiles - ${code}`
  // );

  return intersection(dmt, cmt);
}

export default curry(computeFinalMT);
