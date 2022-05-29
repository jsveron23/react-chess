import { curry, init, last, isNil, nth } from 'ramda';
import { diffSnapshot } from '../utils';

/**
 * Create sheet data (notation list)
 * @param  {Object} present
 * @param  {Array}  past
 * @return {Array}
 */
function createSheetData(present, past) {
  return [...past, present].reduce((acc, curr, idx, self) => {
    const prev = nth(idx + 1, self);

    if (isNil(prev)) {
      return acc;
    }

    const { from, to } = diffSnapshot(curr.snapshot, prev.snapshot);
    const sideData = {
      [curr.turn]: { checkData: prev.checkData, from, to },
    };
    let o = last(acc) || {};

    // create new
    if (o.black) {
      return [...acc, sideData];
    }

    // insert `black` data to `last`
    return [
      ...init(acc),
      {
        ...last(acc),
        ...sideData,
      },
    ];
  }, []);
}

export default curry(createSheetData);
