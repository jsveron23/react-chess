import { connect } from 'react-redux';
import { HintDialog } from '~/components';
import { clearHint } from '~/store/slices/hint';

const mapStateToProps = ({ hint: { data }, ai: { depth } }) => ({
  hintData: data,
  depth,
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(clearHint()),
});

const HintDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HintDialog);

export { HintDialogContainer };
