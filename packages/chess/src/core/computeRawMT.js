import { curry, compose, concat, intersection, flatten } from 'ramda';
import computeMTByCode from './computeMTByCode';
import computeMTByDirection from './computeMTByDirection';
import computeSpecialMT from './computeSpecialMT';

/**
 * Compute unfiltered movable tiles
 * @param  {Array}  timeline
 * @param  {String} code
 * @return {Array}
 */
function computeRawMT(timeline, code) {
  const [snapshot] = timeline;
  const smt = computeSpecialMT(timeline, code);
  const _concatMT = compose(flatten, concat(smt));
  const dmt = compose(_concatMT, computeMTByDirection(snapshot))(code);
  const cmt = compose(_concatMT, computeMTByCode)(code);

  return intersection(dmt, cmt);
}

export default curry(computeRawMT);
