import { curry, compose, equals, find, nth } from 'ramda';

/**
 * Detect whether moved or not
 * @param  {Array}   timeline
 * @param  {String}  code
 * @return {Boolean}
 */
function detectMoved(timeline, code) {
  const codeList = [];

  for (let i = 0, len = timeline.length; i < len; i++) {
    const foundCode = compose(find(equals(code)), nth(i))(timeline);

    if (foundCode) {
      codeList.push(code);
    }
  }

  return timeline.length !== codeList.length;
}

export default curry(detectMoved);
