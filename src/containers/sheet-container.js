import { connect } from 'react-redux';
import { Sheet } from '~/components';
import { selectAnalysis } from '~/store/slices/analysis';

const mapStateToProps = ({
  ingame: {
    present: { sheetData },
  },
  ai: { depth },
}) => ({ data: sheetData, depth });

const mapDispatchToProps = (dispatch) => ({
  onAnalyze: (sideData) => dispatch(selectAnalysis(sideData)),
});

const SheetContainer = connect(mapStateToProps, mapDispatchToProps)(Sheet);

export { SheetContainer };
