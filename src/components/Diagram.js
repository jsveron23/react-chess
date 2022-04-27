import PropTypes from 'prop-types';
import { FlexCol } from 'ui/es';
import Rank from './Rank';

const Diagram = ({ snapshot }) => {
  return (
    <FlexCol height="100%">
      <Rank snapshot={snapshot} />
    </FlexCol>
  );
};

Diagram.propTypes = {
  snapshot: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Diagram;
