import { compose, last, apply, props, prop } from 'ramda';
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

    dispatch({
      type: MEASURE_AXIS,
      payload: compose(
        apply(getAnimationAxis),
        props(['from', 'to']),
        prop(Opponent[turn]),
        last
      )(sheetData),
    });
  };
}
