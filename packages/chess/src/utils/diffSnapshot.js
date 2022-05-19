import { curry, difference } from 'ramda';

/**
 * Get snapshots difference
 * @param  {Array}  currSnapshot
 * @param  {Array}  prevSnapshot
 * @return {Object}
 */
function diffSnapshot(currSnapshot, prevSnapshot) {
  return {
    from: difference(currSnapshot, prevSnapshot),
    to: difference(prevSnapshot, currSnapshot),
  };
}

export default curry(diffSnapshot);
