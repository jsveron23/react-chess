import PropTypes from 'prop-types';
import { reverse, map, compose, T, cond, always, identity } from 'ramda';
import { File as Files, detectDarkTile } from 'chess/es';
import { useDiagram } from '~/hooks';
import { Tile } from './tile';

const File = ({ rankName }) => {
  const { getPKey, flip } = useDiagram();

  return compose(
    map((fileName) => {
      const isDark = detectDarkTile(fileName, rankName);
      const tileName = `${fileName}${rankName}`;
      const pKey = getPKey(tileName);

      return (
        <Tile key={tileName} isDark={isDark} tileName={tileName} pKey={pKey} />
      );
    }),
    cond([
      [always(flip), reverse],
      [T, identity],
    ])
  )(Files);
};

File.propTypes = {
  rankName: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export { File };
