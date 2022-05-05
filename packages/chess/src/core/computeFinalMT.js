import { curry, compose, concat, intersection, flatten } from 'ramda';
import computeMTByCode from './computeMTByCode';
import computeMTByDirection from './computeMTByDirection';
import computeSpecialMT from './computeSpecialMT';
import debug from '../debug';

/**
 * Compute final movable tiles
 * @param  {String} code
 * @param  {Array}  timeline
 * @return {Array}
 */
function computeFinalMT(code, timeline) {
  const [snapshot] = timeline;

  // smt will return tiles list
  const smt = computeSpecialMT(code, timeline);
  const _concatMT = compose(flatten, concat(smt));

  const dmt = compose(_concatMT, computeMTByDirection(code))(snapshot);
  const cmt = compose(_concatMT, computeMTByCode)(code);

  debug.grp(
    {
      dmt: [
        ['original: ', computeMTByDirection(code, snapshot)],
        ['concat: ', dmt],
      ],

      cmt: [
        ['original: ', computeMTByCode(code)],
        ['concat: ', cmt],
      ],

      smt: [['original: ', smt]],
    },
    { collapsed: true }
  );

  return intersection(dmt, cmt);
}

export default curry(computeFinalMT);
