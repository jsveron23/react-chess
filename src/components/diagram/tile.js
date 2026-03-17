import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Relative, Absolute, Text, FlexOne } from 'ui/es';
import { useDiagram, useTheme } from '~/hooks';
import { Piece } from './piece';
import { Mask } from './mask';

const Tile = ({ isDark = false, pKey = '', tileName }) => {
  const { onClickTile } = useDiagram();
  const { color } = useTheme();
  const pretendCode = `${pKey}${tileName}`;
  const handleClick = useCallback(
    (/* evt */) => onClickTile(tileName, pretendCode),
    [pretendCode, tileName, onClickTile]
  );

  return (
    <FlexOne
      is={Relative}
      backgroundColor={isDark ? color.dark : color.light}
      onClick={handleClick}
    >
      <Mask pretendCode={pretendCode} tileName={tileName} />

      <Absolute color={color.gray2}>
        <Text padding={5}>{tileName}</Text>
      </Absolute>

      <Piece pKey={pKey} pretendCode={pretendCode} />
    </FlexOne>
  );
};

Tile.propTypes = {
  tileName: PropTypes.string.isRequired,
  pKey: PropTypes.string,
  isDark: PropTypes.bool,
};

export { Tile };
