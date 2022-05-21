import {
  curry,
  compose,
  equals,
  map,
  filter,
  length,
  complement,
  find,
} from 'ramda';

/**
 * Detect whether moved or not
 * @param  {Array}   timeline
 * @param  {String}  code
 * @return {Boolean}
 */
function detectMoved(timeline, code) {
  return compose(
    complement(equals)(timeline.length),
    length,
    filter(Boolean),
    map(find(equals(code)))
  )(timeline);
}

export default curry(detectMoved);
