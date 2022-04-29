import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Relative, Absolute, Text } from 'ui/es';
import { validCode } from 'chess/es';
import useTheme from '~/styles/useTheme';
import Piece from './Piece';

const Tile = ({
  selectedCode,
  tileName,
  fileName,
  rankName,
  movableTiles,
  onClick,
  getTileBg,
  getPKey,
}) => {
  const { tile } = useTheme();
  const bg = getTileBg(tile, fileName, rankName);
  const pKey = getPKey(tileName);
  const code = `${pKey}${tileName}`;
  const handleClickTile = useCallback(
    // filter empty tile
    (evt) => validCode(code) && onClick(code)(evt),
    [code, onClick]
  );
  const isCodeMatched = [selectedCode, ...movableTiles].includes(code);

  return (
    <Relative
      key={fileName}
      flex="1"
      // data-rank={rankName}
      // data-file={fileName}
      // data-tile={tileName}
      backgroundColor={bg}
      onClick={handleClickTile}
    >
      <Absolute zIndex={999} top={0} bottom={0} left={0} right={0}>
        <Piece pKey={pKey} />
      </Absolute>

      <Absolute color={tile.text}>
        <Text padding={5}>{tileName}</Text>
      </Absolute>

      <Absolute
        top={0}
        bottom={0}
        left={0}
        right={0}
        margin={1}
        backgroundColor={isCodeMatched ? 'rgba(100, 100, 100, 0.3)' : 'auto'}
        border={isCodeMatched ? '2px dashed #999' : 'none'}
      />
    </Relative>
  );
};

Tile.propTypes = {
  getTileBg: PropTypes.func.isRequired,
  getPKey: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  tileName: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  rankName: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  movableTiles: PropTypes.arrayOf(PropTypes.string),
  selectedCode: PropTypes.string,
};

Tile.defaultProps = {
  selectedCode: '',
  movableTiles: [],
};

export default Tile;
