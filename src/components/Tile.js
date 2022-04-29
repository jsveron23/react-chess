import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Relative, Absolute, Text } from 'ui/es';
import { validCode } from 'chess/es';
import useTheme from '~/styles/useTheme';
import Piece from './Piece';
import Mask from './Mask';

const Tile = ({
  selectedCode,
  tileName,
  fileName,
  rankName,
  pKey,
  movableTiles,
  updateSelectedCode,
  getTileBg,
  movePiece,
}) => {
  const { tile } = useTheme();
  const bg = getTileBg(tile, fileName, rankName);
  const code = `${pKey}${tileName}`;
  const isPieceTile = validCode(code);
  const isMovableTile = movableTiles.indexOf(tileName) > -1;
  const isCodeMatched = [selectedCode, ...movableTiles].indexOf(code) > -1;
  const handleClickTile = useCallback(
    (/* evt */) => {
      if (isPieceTile) {
        updateSelectedCode(code);
      } else if (isMovableTile) {
        movePiece(tileName);
      }
    },
    [movePiece, code, tileName, isPieceTile, isMovableTile, updateSelectedCode]
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
