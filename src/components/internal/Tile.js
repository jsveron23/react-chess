import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Relative, Absolute, Text } from 'ui/es';
import { useDiagram, useTheme } from '~/hooks';
import Piece from './Piece';
import Mask from './Mask';

const Tile = ({ isDark, pKey, tileName }) => {
  const { onClickTile } = useDiagram();
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
      <Mask pretendCode={pretendCode} tileName={tileName} />

      <Absolute color={tile.text}>
        <Text padding={5}>{tileName}</Text>
      </Absolute>

      <Piece pKey={pKey} pretendCode={pretendCode} />
    </Relative>
  );
};

Tile.propTypes = {
  tileName: PropTypes.string.isRequired,
  pKey: PropTypes.string,
  isDark: PropTypes.bool,
};

Tile.defaultProps = {
  pKey: '',
  isDark: false,
};

export default Tile;
