import { compose, reverse, nth, prop } from 'ramda';
import { getAnimationAxis, Opponent } from 'chess/es';
import { MEASURE_AXIS } from '../actionTypes';

/**
 * Measure axis for animation
 * @param  {Array}   sheetData
 * @return {Boolean}
 */
export function measureAxis(sheetData) {
  return (dispatch, getState) => {
    const {
      ingame: {
        present: { turn },
      },
    } = getState();

    const { from, to } = compose(
      prop(Opponent[turn]),
      nth(0),
      reverse
    )(sheetData);

    dispatch({
      type: MEASURE_AXIS,
      payload: getAnimationAxis(from, to),
    });
  };
}
