import PropTypes from 'prop-types';
import { FlexCol } from 'ui/es';
import Rank from './internal/Rank';

const Diagram = ({ selectedCode, movableTiles, getPKey, onClickTile }) => {
  return (
    <FlexCol height="100%">
      <Rank
        selectedCode={selectedCode}
        movableTiles={movableTiles}
        getPKey={getPKey}
        onClickTile={onClickTile}
      />
    </FlexCol>
  );
};

Diagram.propTypes = {
  getPKey: PropTypes.func.isRequired,
  onClickTile: PropTypes.func.isRequired,
  movableTiles: PropTypes.arrayOf(PropTypes.string),
  selectedCode: PropTypes.string,
};

Diagram.defaultProps = {
  selectedCode: '',
  movableTiles: [],
};

export default Diagram;
