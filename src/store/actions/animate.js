import { compose, last, apply, props, prop } from 'ramda';
import { Side, getAnimationAxis, Opponent } from 'chess/es';
import { MEASURE_AXIS } from '../actionTypes';

/**
 * Measure axis for animation
 * @param  {Array}   sheetData
 * @return {Boolean}
 */
export function measureAxis(sheetData) {
  return (dispatch, getState) => {
    const {
      general: { flip },
      network: { side, connected },
      ingame: {
        present: { turn },
      },
    } = getState();

    dispatch({
      type: MEASURE_AXIS,
      payload: compose(
        apply(getAnimationAxis(flip || (connected && side === Side.black))),
        props(['from', 'to']),
        prop(Opponent[turn]),
        last
      )(sheetData),
    });
  };
}
