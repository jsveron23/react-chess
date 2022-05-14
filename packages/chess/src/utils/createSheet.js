import { curry, difference, reverse, isNil } from 'ramda';

function createSheet(present, past) {
  const _getDiff = (currSnapshot, prevSnapshot) => {
    return {
      from: difference(currSnapshot, prevSnapshot),
      to: difference(prevSnapshot, currSnapshot),
    };
  };

  return [...past, present].reduce((acc, state, idx, self) => {
    const [last, ...rest] = reverse(acc);
    const prevState = self[idx + 1];

    if (!isNil(prevState)) {
      const { from, to } = _getDiff(state.snapshot, prevState.snapshot);
      let o = last || {};

      // next
      if (o.black) {
        o = {
          [state.turn]: { check: prevState.check, from, to },
        };

        return [...acc, o];
      }

      // add black to `last`
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
