import { connect } from 'react-redux';
import memoizeOne from 'memoize-one';
import { createSheet } from 'chess/es';
import { Sheet } from '~/components';
// import { } from '~/store/actions';

const _createSheet = memoizeOne(createSheet);

function mapStateToProps({ ingame: { present, past } }) {
  // TODO move to
  const data = _createSheet(present, past);

  return { data };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Sheet);
