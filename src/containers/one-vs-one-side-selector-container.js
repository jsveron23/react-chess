import { connect } from 'react-redux';
import { Turn } from 'chess/es';
import { CpuSideSelector } from '~/components';
import { worker } from '~/services/worker/ai-worker';
import { setPlayerSide, updateMatchType, updateTurn } from '~/store/actions';
import { ONE_VS_ONE } from '~/presets';

const mapStateToProps = ({ ai: { playerSide } }) => ({ playerSide });

const mapDispatchToProps = (dispatch) => ({
  onSelect: (side) => {
    worker.close();
    // Track selected side in state (UI stays in sync with CPU mode selector).
    dispatch(setPlayerSide(side));
    // Reset board; updateMatchType always initialises the turn to White.
    dispatch(updateMatchType(ONE_VS_ONE));
    // When the player wants Black to go first, override the starting turn.
    if (side === 'b') {
      dispatch(updateTurn(Turn.b));
    }
  },
});

const OneVsOneSideSelectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CpuSideSelector);

export { OneVsOneSideSelectorContainer };
