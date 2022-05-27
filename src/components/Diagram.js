import PropTypes from 'prop-types';
import { FlexCol } from 'ui/es';
import Rank from './internal/Rank';
import { ChessProvider } from '~/utils/hooks';

const Diagram = ({
  animate,
  getPKey,
  checkCode,
  checkRoute,
  detectEnemy,
  onClickTile,
  checkDefenders,
  detectOTWByCode,
  detectEnPassantTile,
}) => {
  return (
    <ChessProvider
      value={{
        animate,
        getPKey,
        checkCode,
        checkRoute,
        detectEnemy,
        onClickTile,
        checkDefenders,
        detectOTWByCode,
        detectEnPassantTile,
      }}
    >
      <FlexCol height="100%">
        <Rank />
      </FlexCol>
    </ChessProvider>
  );
};

Diagram.propTypes = {
  getPKey: PropTypes.func.isRequired,
  detectOTWByCode: PropTypes.func.isRequired,
  detectEnemy: PropTypes.func.isRequired,
  detectEnPassantTile: PropTypes.func.isRequired,
  onClickTile: PropTypes.func.isRequired,
  animate: PropTypes.shape({
    targetCode: PropTypes.string,
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
    targetCode: '',
    from: {
      x: 0,
      y: 0,
    },
  },
};

export default Diagram;
