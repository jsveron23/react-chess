import PropTypes from 'prop-types';
import { File as Files } from 'chess/es';
import Tile from './Tile';

const File = ({
  selectedCode,
  rankName,
  getTileBg,
  getPKey,
  updateSelectedCode,
  movePiece,
  movableTiles,
}) => {
  return Files.map((fileName) => {
    const tileName = `${fileName}${rankName}`;
    const pKey = getPKey(tileName);

    return (
      <Tile
        key={tileName}
        selectedCode={selectedCode}
        tileName={tileName}
        fileName={fileName}
        rankName={rankName}
        movableTiles={movableTiles}
        updateSelectedCode={updateSelectedCode}
        getTileBg={getTileBg}
        movePiece={movePiece}
        pKey={pKey}
      />
    );
  });
};

File.propTypes = {
  getTileBg: PropTypes.func.isRequired,
  getPKey: PropTypes.func.isRequired,
  updateSelectedCode: PropTypes.func.isRequired,
  movePiece: PropTypes.func.isRequired,
  rankName: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  movableTiles: PropTypes.arrayOf(PropTypes.string),
  selectedCode: PropTypes.string,
};

File.defaultProps = {
  selectedCode: '',
  movableTiles: [],
};

export default File;
