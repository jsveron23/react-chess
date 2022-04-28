import PropTypes from 'prop-types';
import { FlexCol } from 'ui/es';
import Rank from './Rank';

const Diagram = ({ selectedCode, getTileBg, getPKey, updateSelectedCode }) => {
  return (
    <FlexCol height="100%">
      <Rank
        selectedCode={selectedCode}
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
  selectedCode: PropTypes.string,
};

Diagram.defaultProps = {
  selectedCode: '',
};

export default Diagram;
