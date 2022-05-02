import { curry, concat, intersection } from 'ramda';
import computeMTByCode from './computeMTByCode';
import computeMTByDirection from './computeMTByDirection';
import computeSpecialMT from './computeSpecialMT';

// TODO optimize it
// TODO add capture logic
function computeFinalMT(code, timeline) {
  const [snapshot] = timeline;
  const dmt = computeMTByDirection(code, snapshot);
  const cmt = computeMTByCode(code);
  const smt = computeSpecialMT(code);

  console.log('dmt: ', dmt);
  console.log('cmt: ', cmt);
  console.log('smt: ', smt);
  console.log('inter...: ', intersection(dmt, concat(cmt, smt)));

  // intersection combined mt with
  return intersection(dmt, concat(cmt, smt));
}

export default curry(computeFinalMT);
