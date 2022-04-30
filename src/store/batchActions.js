import { batch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { Snapshot, Turn } from 'chess/es';
import {
  updateTurn,
  updateSnapshot,
  removeSelectedCode,
  removeMovableTiles,
} from './actions/ingame';

export function restart() {
  return (dispatch) => {
    batch(() => {
      dispatch(reset());
      dispatch(ActionCreators.clearHistory());
    });
  };
}

export function reset() {
  return (dispatch) => {
    batch(() => {
      dispatch(updateSnapshot(Snapshot));
      dispatch(removeSelectedCode());
      dispatch(removeMovableTiles());
      dispatch(updateTurn(Turn.w));
    });
  };
}

export function next(snapshot, turn) {
  return (dispatch) => {
    batch(() => {
      dispatch(updateSnapshot(snapshot));
      dispatch(removeSelectedCode());
      dispatch(removeMovableTiles());
      dispatch(updateTurn(turn));
    });
  };
}
