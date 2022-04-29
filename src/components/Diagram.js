import PropTypes from 'prop-types';
import { FlexCol } from 'ui/es';
import Rank from './Rank';

const Diagram = ({
  selectedCode,
  movableTiles,
  getTileBg,
  getPKey,
  updateSelectedCode,
}) => {
  return (
    <FlexCol height="100%">
      <Rank
        selectedCode={selectedCode}
        movableTiles={movableTiles}
        getTileBg={getTileBg}
        getPKey={getPKey}
        updateSelectedCode={updateSelectedCode}
      />
    </FlexCol>
  );
};

Diagram.propTypes = {
  getTileBg: PropTypes.func.isRequired,
  getPKey: PropTypes.func.isRequired,
  updateSelectedCode: PropTypes.func.isRequired,
  movableTiles: PropTypes.arrayOf(PropTypes.string),
  selectedCode: PropTypes.string,
};

Diagram.defaultProps = {
  selectedCode: '',
  movableTiles: [],
};

export default Diagram;
