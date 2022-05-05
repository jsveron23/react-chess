import { curry, equals } from 'ramda';

function detectMoved(timeline, code) {
  const codeList = [];

  timeline.forEach((s) => {
    const foundCode = s.find(equals(code));

    foundCode && codeList.push(code);
  });

  return timeline.length !== codeList.length;
}

export default curry(detectMoved);
