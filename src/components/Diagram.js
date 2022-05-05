import PropTypes from 'prop-types';
import { FlexCol } from 'ui/es';
import Rank from './internal/Rank';

const Diagram = ({
  detectEnemy,
  getPKey,
  detectOTWByCode,
  onClickTile,
  detectEnPassantTile,
}) => {
  return (
    <FlexCol height="100%">
      <Rank
        getPKey={getPKey}
        detectOTWByCode={detectOTWByCode}
        detectEnemy={detectEnemy}
        onClickTile={onClickTile}
        detectEnPassantTile={detectEnPassantTile}
      />
    </FlexCol>
  );
};

Diagram.propTypes = {
  getPKey: PropTypes.func.isRequired,
  detectOTWByCode: PropTypes.func.isRequired,
  detectEnemy: PropTypes.func.isRequired,
  detectEnPassantTile: PropTypes.func.isRequired,
  onClickTile: PropTypes.func.isRequired,
};

export default Diagram;
