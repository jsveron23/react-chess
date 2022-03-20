import React from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';
import { Rank as Ranks, File as Files, getPiece } from 'chess/es';

// TODO move
function checkDarkBg({ rankName, fileName }) {
  const rankIdx = Math.abs(Ranks.indexOf(rankName) - 8);
  const fileIdx = Files.indexOf(fileName) + 1;

  return (rankIdx + fileIdx) % 2 === 0;
}

const File = ({ rankName, snapshot }) => {
  const extractTileName = ({ fileName, rankName }) => {
    return snapshot.find((code) => {
      const [, , ...tileName] = code.split('');

      return tileName.join('') === `${fileName}${rankName}`;
    });
  };

  return Files.map((fileName) => {
    const isDark = checkDarkBg({ rankName, fileName });
    const bg = isDark ? '#eaeaea' : '#fff';
    const [side, piece] = extractTileName({ fileName, rankName }) || [];
    let Piece;

    if (side) {
      Piece = getPiece(`${side}${piece}`);
    }

    return (
      <Box
        key={fileName}
        flex="1"
        data-rank={rankName}
        data-file={fileName}
        backgroundColor={bg}
        position="relative"
      >
        <Box
          position="absolute"
          padding={5}
          color="#ccc"
        >{`${fileName}${rankName}`}</Box>

        {Piece && (
          <Box
            display="flex"
            width="100%"
            height="100%"
            justifyContent="center"
          >
            <Piece width="70%" />
          </Box>
        )}
      </Box>
    );
  });
};

File.propTypes = {
  rankName: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  snapshot: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default File;
