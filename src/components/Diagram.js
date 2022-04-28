import PropTypes from 'prop-types';
import { FlexCol } from 'ui/es';
import Rank from './Rank';

const Diagram = ({ getTileBg, getPKey }) => {
  return (
    <FlexCol height="100%">
      <Rank getTileBg={getTileBg} getPKey={getPKey} />
    </FlexCol>
  );
};

Diagram.propTypes = {
  getTileBg: PropTypes.func.isRequired,
  getPKey: PropTypes.func.isRequired,
};

export default Diagram;
