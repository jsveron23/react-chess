import PropTypes from 'prop-types';
import { File as Files, detectDarkTile } from 'chess/es';
import Tile from './Tile';

const File = ({ rankName, getPKey, detectInMT, detectEnemy, onClickTile }) => {
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
        detectInMT={detectInMT}
        detectEnemy={detectEnemy}
        onClickTile={onClickTile}
      />
    );
  });
};

File.propTypes = {
  getPKey: PropTypes.func.isRequired,
  detectInMT: PropTypes.func.isRequired,
  detectEnemy: PropTypes.func.isRequired,
  onClickTile: PropTypes.func.isRequired,
  rankName: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default File;
