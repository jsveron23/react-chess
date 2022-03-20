import React from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';
import { Rank as Ranks, File as Files } from 'chess/es';

// TODO move
function checkDarkBg({ rankName, fileName }) {
  const rankIdx = Math.abs(Ranks.indexOf(rankName) - 8);
  const fileIdx = Files.indexOf(fileName) + 1;

  return (rankIdx + fileIdx) % 2 === 0;
}

const File = ({ rankName }) => {
  return Files.map((fileName) => {
    const isDark = checkDarkBg({ rankName, fileName });
    const bg = isDark ? '#eaeaea' : '#fff';

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
      </Box>
    );
  });
};

File.propTypes = {
  rankName: PropTypes.string.isRequired,
};

export default File;
