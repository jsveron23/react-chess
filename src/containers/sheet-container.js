import { connect } from 'react-redux';
import { Sheet } from '~/components';

const mapStateToProps = ({
  ingame: {
    present: { sheetData },
  },
  ai: { depth },
}) => ({ data: sheetData, depth });

const SheetContainer = connect(mapStateToProps)(Sheet);

export { SheetContainer };
