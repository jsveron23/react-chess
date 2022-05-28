import PropTypes from 'prop-types';
import { File as Files, detectDarkTile } from 'chess/es';
import Tile from './Tile';
import { useDiagram } from '~/hooks';

const File = ({ rankName }) => {
  const { getPKey } = useDiagram();

  return Files.map((fileName) => {
    const isDark = detectDarkTile(fileName, rankName);
    const tileName = `${fileName}${rankName}`;
    const pKey = getPKey(tileName);

    return (
      <Tile key={tileName} isDark={isDark} tileName={tileName} pKey={pKey} />
    );
  });
};

File.propTypes = {
  rankName: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default File;
