import { connect } from 'react-redux';
import { AnalysisPanel } from '~/components';
import { setIndex } from '~/store/slices/analysis';
import { ONE_VS_CPU } from '~/presets/menu-keys';

const mapStateToProps = ({
  analysis: { history, index },
  ai: { depth },
  general: { matchType },
}) => ({
  history,
  index,
  depth,
  isCpu: matchType === ONE_VS_CPU,
});

const mapDispatchToProps = (dispatch) => ({
  onSetIndex: (n) => dispatch(setIndex(n)),
});

const AnalysisPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnalysisPanel);

export { AnalysisPanelContainer };
