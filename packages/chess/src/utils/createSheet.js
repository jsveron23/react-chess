import { curry, reverse, isNil } from 'ramda';
import diffSnapshot from './diffSnapshot';

/**
 * Create sheet (notation list)
 * @param  {Object} present
 * @param  {Array}  past
 * @return {Array}
 */
function createSheet(present, past) {
  return [...past, present].reduce((acc, curr, idx, self) => {
    const [last, ...rest] = reverse(acc);
    const prev = self[idx + 1];

    if (!isNil(prev)) {
      const { from, to } = diffSnapshot(curr.snapshot, prev.snapshot);
      const { turn: key } = curr;
      const { check } = prev;
      const sideData = { [key]: { check, from, to } };
      let o = last || {};

      // create new
      if (o.black) {
        return [...acc, sideData];
      }

      // insert `black` data to `last`
      return [
        ...reverse(rest),
        {
          ...last,
          ...sideData,
        },
      ];
    }

    return acc;
  }, []);
}

export default curry(createSheet);
