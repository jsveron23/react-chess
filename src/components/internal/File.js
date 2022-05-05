import PropTypes from 'prop-types';
import { File as Files, detectDarkTile } from 'chess/es';
import Tile from './Tile';

const File = ({
  rankName,
  getPKey,
  detectOTWByCode,
  detectEnemy,
  onClickTile,
  detectEnPassantTile,
}) => {
  return Files.map((fileName) => {
    const isDark = detectDarkTile(fileName, rankName);
    const tileName = `${fileName}${rankName}`;

    // get pKey from matched code in snapshot
    const pKey = getPKey(tileName);

    return (
      <Tile
        key={tileName}
        isDark={isDark}
        tileName={tileName}
        pKey={pKey}
        detectOTWByCode={detectOTWByCode}
        detectEnemy={detectEnemy}
        onClickTile={onClickTile}
        detectEnPassantTile={detectEnPassantTile}
      />
    );
  });
};

File.propTypes = {
  getPKey: PropTypes.func.isRequired,
  detectOTWByCode: PropTypes.func.isRequired,
  detectEnPassantTile: PropTypes.func.isRequired,
  detectEnemy: PropTypes.func.isRequired,
  onClickTile: PropTypes.func.isRequired,
  rankName: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default File;
