import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Relative, Absolute, Text } from 'ui/es';
import useTheme from '~/styles/useTheme';
import Piece from './Piece';
import Mask from './Mask';

const Tile = ({
  animate,
  checkCode,
  checkRoute,
  checkDefenders,
  isDark,
  pKey,
  tileName,
  detectOTWByCode,
  detectEnemy,
  detectEnPassantTile,
  onClickTile,
}) => {
  const { tile } = useTheme();
  const pretendCode = `${pKey}${tileName}`;
  const handleClick = useCallback(
    (/* evt */) => onClickTile(tileName, pretendCode),
    [pretendCode, tileName, onClickTile]
  );

  return (
    <Relative
      flex="1"
      backgroundColor={isDark ? tile.dark : tile.light}
      onClick={handleClick}
    >
      <Mask
        checkCode={checkCode}
        checkRoute={checkRoute}
        checkDefenders={checkDefenders}
        pretendCode={pretendCode}
        tileName={tileName}
        detectOTWByCode={detectOTWByCode}
        detectEnemy={detectEnemy}
        detectEnPassantTile={detectEnPassantTile}
      />

      <Absolute color={tile.text}>
        <Text padding={5}>{tileName}</Text>
      </Absolute>

      <Piece animate={animate} pKey={pKey} pretendCode={pretendCode} />
    </Relative>
  );
};

Tile.propTypes = {
  detectOTWByCode: PropTypes.func.isRequired,
  detectEnemy: PropTypes.func.isRequired,
  detectEnPassantTile: PropTypes.func.isRequired,
  onClickTile: PropTypes.func.isRequired,
  tileName: PropTypes.string.isRequired,
  animate: PropTypes.shape({
    code: PropTypes.string,
    from: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }).isRequired,
  checkRoute: PropTypes.arrayOf(PropTypes.string),
  checkDefenders: PropTypes.arrayOf(PropTypes.string),
  checkCode: PropTypes.string,
  pKey: PropTypes.string,
  isDark: PropTypes.bool,
};

Tile.defaultProps = {
  pKey: '',
  checkCode: '',
  checkRoute: [],
  checkDefenders: [],
  isDark: false,
};

export default Tile;
