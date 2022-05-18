import PropTypes from 'prop-types';
import { File as Files, detectDarkTile } from 'chess/es';
import Tile from './Tile';

const File = ({
  animate,
  checkCode,
  checkRoute,
  checkDefenders,
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
        animate={animate}
        checkCode={checkCode}
        checkRoute={checkRoute}
        checkDefenders={checkDefenders}
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
  animate: PropTypes.shape({
    code: PropTypes.string,
    from: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }).isRequired,
  rankName: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  checkRoute: PropTypes.arrayOf(PropTypes.string),
  checkDefenders: PropTypes.arrayOf(PropTypes.string),
  checkCode: PropTypes.string,
};

File.defaultProps = {
  checkCode: '',
  checkRoute: [],
  checkDefenders: [],
};

export default File;
