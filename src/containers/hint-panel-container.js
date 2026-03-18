import { connect } from 'react-redux';
import { HintPanel } from '~/components';
import { requestHint } from '~/store/actions';

const mapStateToProps = ({
  hint: { data, loading },
  ai: { depth, thinking },
}) => ({
  hintData: data,
  loading,
  depth,
  thinking,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestHint: () => dispatch(requestHint()),
});

const HintPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HintPanel);

export { HintPanelContainer };
