import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { detectDarkTile } from 'chess/es';
import { Relative, Absolute, Text } from 'ui/es';
import useTheme from '~/styles/useTheme';
import Piece from './Piece';
import Mask from './Mask';

const Tile = ({
  pKey,
  tileName,
  fileName,
  rankName,
  selectedCode,
  movableTiles,
  onClickTile,
}) => {
  const { tile } = useTheme();
  const isDark = detectDarkTile(fileName, rankName);

  // code or tileName(pKey can be empty if no piece on tile)
  const pretendCode = `${pKey}${tileName}`;

  // actual code will match with piece tile
  // tiles will match with empty tiles
  const isCodeMatched =
    [selectedCode, ...movableTiles].indexOf(pretendCode) > -1;

  const handleClickTile = useCallback(
    (/* evt */) => onClickTile(movableTiles, tileName, pretendCode),
    [pretendCode, tileName, movableTiles, onClickTile]
  );

  return (
    <Relative
      flex="1"
      backgroundColor={isDark ? tile.dark : tile.light}
      onClick={handleClickTile}
    >
      <Absolute color={tile.text}>
        <Text padding={5}>{tileName}</Text>
      </Absolute>

      <Piece pKey={pKey} />
      <Mask isCodeMatched={isCodeMatched} />
    </Relative>
  );
};

Tile.propTypes = {
  onClickTile: PropTypes.func.isRequired,
  tileName: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  rankName: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  movableTiles: PropTypes.arrayOf(PropTypes.string),
  selectedCode: PropTypes.string,
  pKey: PropTypes.string,
};

Tile.defaultProps = {
  pKey: '',
  selectedCode: '',
  movableTiles: [],
};

export default Tile;
