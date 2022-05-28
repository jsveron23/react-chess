import PropTypes from 'prop-types';
import { FlexCol } from 'ui/es';
import Rank from './internal/Rank';
import { DiagramProvider } from '~/hooks';

const Diagram = ({
  animate,
  getPKey,
  detectOn,
  checkCode,
  checkRoute,
  detectEnemy,
  onClickTile,
  checkDefenders,
  detectEnPassantTile,
}) => {
  return (
    <DiagramProvider
      value={{
        animate,
        getPKey,
        detectOn,
        checkCode,
        checkRoute,
        detectEnemy,
        onClickTile,
        checkDefenders,
        detectEnPassantTile,
      }}
    >
      <FlexCol height="100%">
        <Rank />
      </FlexCol>
    </DiagramProvider>
  );
};

Diagram.propTypes = {
  getPKey: PropTypes.func.isRequired,
  detectOn: PropTypes.func.isRequired,
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
