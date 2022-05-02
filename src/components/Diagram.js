import PropTypes from 'prop-types';
import { FlexCol } from 'ui/es';
import Rank from './internal/Rank';

const Diagram = ({ detectEnemy, getPKey, detectInMT, onClickTile }) => {
  return (
    <FlexCol height="100%">
      <Rank
        getPKey={getPKey}
        detectInMT={detectInMT}
        detectEnemy={detectEnemy}
        onClickTile={onClickTile}
      />
    </FlexCol>
  );
};

Diagram.propTypes = {
  getPKey: PropTypes.func.isRequired,
  detectInMT: PropTypes.func.isRequired,
  detectEnemy: PropTypes.func.isRequired,
  onClickTile: PropTypes.func.isRequired,
};

export default Diagram;
