import { compose, concat, curry, map, prop, of } from 'ramda';

/**
 * Create timeline
 * @param  {Object} present
 * @param  {Array}  past
 * @return {Array}
 */
function createTimeline(present, past) {
  return compose(
    compose(concat, of, prop('snapshot'))(present),
    map(prop('snapshot'))
  )(past);
}

export default curry(createTimeline);
