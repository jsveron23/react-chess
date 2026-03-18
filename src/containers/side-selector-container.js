import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { Turn } from 'chess/es';
import { CpuSideSelector } from '~/components/cpu-side-selector';
import { worker } from '~/services/worker/ai-worker';
import {
  setSide,
  updateMatchType,
  updateTurn,
} from '~/store/actions';
import { ONE_VS_ONE, ONE_VS_CPU } from '~/presets';

const mapStateToProps = ({ ai: { playerSide }, general: { matchType } }) => ({
  playerSide,
  matchType,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

const mergeProps = ({ playerSide, matchType }, { dispatch }) => ({
  playerSide,
  onSelect: (side) => {
    worker.close();
    dispatch(setSide(side));
    if (matchType === ONE_VS_ONE) {
      dispatch(updateMatchType(ONE_VS_ONE));
      if (side === 'b') {
        dispatch(updateTurn(Turn.b));
        dispatch(ActionCreators.clearHistory());
      }
    } else if (matchType === ONE_VS_CPU) {
      dispatch(updateMatchType(ONE_VS_CPU));
    }
  },
});

const SideSelectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CpuSideSelector);

export { SideSelectorContainer };
