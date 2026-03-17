import { connect } from 'react-redux';
import { CpuSideSelector } from '~/components';
import { worker } from '~/services/worker/ai-worker';
import { updateCpuSide, playCpu } from '~/store/actions';

const mapStateToProps = ({ ai: { playerSide } }) => ({ playerSide });

const mapDispatchToProps = (dispatch) => ({
  onSelect: (side) => {
    worker.close();
    // updateCpuSide sets cpuTurn and resets the board via updateMatchType.
    dispatch(updateCpuSide(side));
    // playCpu guards itself: only runs when matchType===ONE_VS_CPU && turn===cpuTurn.
    // This triggers the CPU's opening move when the player picks Black.
    dispatch(playCpu());
  },
});

const CpuSideSelectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CpuSideSelector);

export { CpuSideSelectorContainer };
