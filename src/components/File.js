import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { File as Files } from 'chess/es';
import Tile from './Tile';

const File = ({
  selectedCode,
  rankName,
  getTileBg,
  getPKey,
  updateSelectedCode,
  movableTiles,
}) => {
  const handleClick = useCallback(
    (code) => (/* evt */) => {
      updateSelectedCode(code);
    },
    [updateSelectedCode]
  );

  return Files.map((fileName) => {
    const tileName = `${fileName}${rankName}`;

    return (
      <Tile
        key={tileName}
        selectedCode={selectedCode}
        tileName={tileName}
        fileName={fileName}
        rankName={rankName}
        movableTiles={movableTiles}
        onClick={handleClick}
        getTileBg={getTileBg}
        getPKey={getPKey}
      />
    );
  });
};

File.propTypes = {
  getTileBg: PropTypes.func.isRequired,
  getPKey: PropTypes.func.isRequired,
  updateSelectedCode: PropTypes.func.isRequired,
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
