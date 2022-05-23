import { curry } from 'ramda';

/**
 * Detect whether contacted or not
 * @param  {String}  file
 * @param  {String}  rank
 * @return {Boolean}
 */
function detectContacted(file, rank) {
  return (
    (file === 1 && rank === 1) ||
    (file === 1 && rank === 0) ||
    (file === 0 && rank === 1)
  );
}

export default curry(detectContacted);
