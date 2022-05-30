import { compose, concat, curry, map, prop, of } from 'ramda';

const _propSnapshot = prop('snapshot');

/**
 * Create timeline
 * @param  {Object} present
 * @param  {Array}  past
 * @return {Array}
 */
function createTimeline(present, past) {
  return compose(
    compose(concat, of, _propSnapshot)(present),
    map(_propSnapshot)
  )(past);
}

export default curry(createTimeline);
