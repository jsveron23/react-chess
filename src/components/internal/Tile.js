import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Relative, Absolute, Text } from 'ui/es';
import useTheme from '~/styles/useTheme';
import Piece from './Piece';
import Mask from './Mask';

const Tile = ({
  isDark,
  pKey,
  tileName,
  detectOTWByCode,
  detectEnemy,
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
      <Absolute color={tile.text}>
        <Text padding={5}>{tileName}</Text>
      </Absolute>

      <Piece pKey={pKey} />

      <Mask
        pretendCode={pretendCode}
        tileName={tileName}
        detectOTWByCode={detectOTWByCode}
        detectEnemy={detectEnemy}
      />
    </Relative>
  );
};

Tile.propTypes = {
  detectOTWByCode: PropTypes.func.isRequired,
  detectEnemy: PropTypes.func.isRequired,
  onClickTile: PropTypes.func.isRequired,
  tileName: PropTypes.string.isRequired,
  pKey: PropTypes.string,
  isDark: PropTypes.bool,
};

Tile.defaultProps = {
  pKey: '',
  isDark: false,
};

export default Tile;
