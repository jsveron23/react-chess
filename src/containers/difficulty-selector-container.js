import { connect } from 'react-redux';
import { DifficultySelector } from '~/components';
import { updateDepth } from '~/store/actions';

const mapStateToProps = ({ ai: { depth } }) => ({ depth });

const mapDispatchToProps = (dispatch) => ({
  onSelect: (depth) => dispatch(updateDepth(depth)),
});

const DifficultySelectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DifficultySelector);

export { DifficultySelectorContainer };
