import { connect } from 'react-redux';
import { Sheet } from '~/components';

const mapStateToProps = ({
  ingame: {
    present: { sheetData },
  },
}) => ({ data: sheetData });

const SheetContainer = connect(mapStateToProps)(Sheet);

export { SheetContainer };
