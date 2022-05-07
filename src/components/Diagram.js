import PropTypes from 'prop-types';
import { FlexCol } from 'ui/es';
import Rank from './internal/Rank';

const Diagram = ({
  checkCode,
  checkRoute,
  checkDefenders,
  detectEnemy,
  getPKey,
  detectOTWByCode,
  onClickTile,
  detectEnPassantTile,
}) => {
  return (
    <FlexCol height="100%">
      <Rank
        checkCode={checkCode}
        checkRoute={checkRoute}
        checkDefenders={checkDefenders}
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
  checkRoute: PropTypes.arrayOf(PropTypes.string),
  checkDefenders: PropTypes.arrayOf(PropTypes.string),
  checkCode: PropTypes.string,
};

Diagram.defaultProps = {
  checkCode: '',
  checkRoute: [],
  checkDefenders: [],
};

export default Diagram;
