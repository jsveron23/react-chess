import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Relative, Absolute, Text } from 'ui/es';
import { validateCode } from 'chess/es';
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
  getTileBg,
  movePiece,
  updateSelectedCode,
}) => {
  const { tile } = useTheme();
  const bg = getTileBg(tile, fileName, rankName);
  const code = `${pKey}${tileName}`;
  const isCodeMatched = [selectedCode, ...movableTiles].indexOf(code) > -1;
  const handleClickTile = useCallback(
    (/* evt */) => {
      const isPieceTile = validateCode(code);
      const isMovableTile = movableTiles.indexOf(tileName) > -1;

      if (isPieceTile) {
        updateSelectedCode(code);
      } else if (isMovableTile) {
        movePiece(tileName);
      }
    },
    [movePiece, code, tileName, movableTiles, updateSelectedCode]
  );

  return (
    <Relative flex="1" backgroundColor={bg} onClick={handleClickTile}>
      <Absolute color={tile.text}>
        <Text padding={5}>{tileName}</Text>
      </Absolute>

      <Piece pKey={pKey} />
      <Mask isCodeMatched={isCodeMatched} />
    </Relative>
  );
};

Tile.propTypes = {
  getTileBg: PropTypes.func.isRequired,
  updateSelectedCode: PropTypes.func.isRequired,
  movePiece: PropTypes.func.isRequired,
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
