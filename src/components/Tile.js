import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Relative, Absolute, Text } from 'ui/es';
import useTheme from '~/styles/useTheme';
import Piece from './Piece';

const Tile = ({
  tileName,
  fileName,
  rankName,
  onClick,
  getTileBg,
  getPKey,
}) => {
  const { tile } = useTheme();
  const bg = getTileBg(tile, fileName, rankName);
  const pKey = getPKey(tileName);
  const code = `${pKey}${tileName}`;
  const handleClickTile = useCallback(
    (evt) => onClick(pKey ? code : '')(evt),
    [pKey, code, onClick]
  );

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
      <Absolute color={tile.text}>
        <Text padding={5}>{tileName}</Text>
      </Absolute>

      <Piece pKey={pKey} />
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
};

export default Tile;
