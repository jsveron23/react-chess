import { compose, last, apply, props, prop } from 'ramda';
import { Side, getAnimationAxis, Opponent } from 'chess/es';
import { MEASURE_AXIS } from '../action-types';
import { ONE_VS_CPU } from '~/presets';

/**
 * Measure axis for animation
 * @param  {Array}   sheetData
 * @return {Boolean}
 */
export function measureAxis(sheetData) {
  return (dispatch, getState) => {
    const {
      ai: { playerSide },
      general: { flip, matchType },
      network: { side, connected },
      ingame: {
        present: { turn },
      },
    } = getState();

    const isBlack =
      (connected && side === Side.black) ||
      (matchType === ONE_VS_CPU && playerSide === Side.black);

    dispatch({
      type: MEASURE_AXIS,
      payload: compose(
        apply(getAnimationAxis(flip || isBlack)),
        props(['from', 'to']),
        prop(Opponent[turn]),
        last
      )(sheetData),
    });
  };
}
