import { connect } from 'react-redux';
import { Sheet } from '~/components';

function mapStateToProps({
  ingame: {
    present: { sheetData },
  },
}) {
  return { data: sheetData };
}

export default connect(mapStateToProps)(Sheet);
