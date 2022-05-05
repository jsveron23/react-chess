import { compose, concat, curry, map, prop, of } from 'ramda';

/**
 * Get timeline
 * @param  {Object} present
 * @param  {Array}  past
 * @return {Array}
 */
function getTimeline(present, past) {
  return compose(
    compose(concat, of, prop('snapshot'))(present),
    map(prop('snapshot'))
  )(past);
}

export default curry(getTimeline);
