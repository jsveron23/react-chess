import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { File as Files } from 'chess/es';
import Tile from './Tile';

const File = ({ rankName, getTileBg, getPKey }) => {
  const handleClick = useCallback(
    (code) => (/* evt */) => {
      /**
       * TODO
       * 1. remove previous border
       * 2. active border
       */
      if (code) {
        console.log(code);
      }
    },
    []
  );

  return Files.map((fileName) => {
    const tileName = `${fileName}${rankName}`;

    return (
      <Tile
        key={tileName}
        tileName={tileName}
        fileName={fileName}
        rankName={rankName}
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
  rankName: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default File;
