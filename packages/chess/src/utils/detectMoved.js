import { curry, equals, find } from 'ramda';

/**
 * Detect whether moved or not
 * @param  {Array}   timeline
 * @param  {String}  code
 * @return {Boolean}
 */
function detectMoved(timeline, code) {
  const codeList = [];

  timeline.forEach((s) => {
    const foundCode = find(equals(code), s);

    foundCode && codeList.push(code);
  });

  return timeline.length !== codeList.length;
}

export default curry(detectMoved);
