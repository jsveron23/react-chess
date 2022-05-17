import { curry, difference, reverse, isNil } from 'ramda';

function _getDiff(currSnapshot, prevSnapshot) {
  return {
    from: difference(currSnapshot, prevSnapshot),
    to: difference(prevSnapshot, currSnapshot),
  };
}

function createSheet(present, past) {
  return [...past, present].reduce((acc, state, idx, self) => {
    const [last, ...rest] = reverse(acc);
    const prevState = self[idx + 1];

    if (!isNil(prevState)) {
      const { from, to } = _getDiff(state.snapshot, prevState.snapshot);
      let o = last || {};

      // create new
      if (o.black) {
        o = {
          [state.turn]: { check: prevState.check, from, to },
        };

        return [...acc, o];
      }

      // insert `black` data to `last`
      o = {
        ...last,
        [state.turn]: { check: prevState.check, from, to },
      };

      return [...reverse(rest), o];
    }

    return acc;
  }, []);
}

export default curry(createSheet);
