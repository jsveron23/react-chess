import { curry, compose, concat, intersection, flatten } from 'ramda';
import { computeMTByCode } from './compute-mt-by-code';
import { computeMTByDirection } from './compute-mt-by-direction';
import { computeSpecialMT } from './compute-special-mt';

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

const computeRawMTCurried = curry(computeRawMT);
export { computeRawMTCurried as computeRawMT };
