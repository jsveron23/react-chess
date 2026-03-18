import { connect } from 'react-redux';
import { AnalysisPanel } from '~/components';
import { setIndex } from '~/store/slices/analysis';

const mapStateToProps = ({ analysis: { history, index }, ai: { depth } }) => ({
  history,
  index,
  depth,
});

const mapDispatchToProps = (dispatch) => ({
  onSetIndex: (n) => dispatch(setIndex(n)),
});

const AnalysisPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnalysisPanel);

export { AnalysisPanelContainer };
