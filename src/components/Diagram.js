import PropTypes from 'prop-types';
import { FlexCol } from 'ui/es';
import Rank from './internal/Rank';

const Diagram = ({
  animate,
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
        animate={animate}
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
  animate: PropTypes.shape({
    code: PropTypes.string,
    from: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }),
  checkRoute: PropTypes.arrayOf(PropTypes.string),
  checkDefenders: PropTypes.arrayOf(PropTypes.string),
  checkCode: PropTypes.string,
};

Diagram.defaultProps = {
  checkCode: '',
  checkRoute: [],
  checkDefenders: [],
  animate: {
    code: '',
    from: {
      x: 0,
      y: 0,
    },
  },
};

export default Diagram;
