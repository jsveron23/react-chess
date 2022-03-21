import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { compose, prop, equals, defaultTo } from 'ramda';
import Box from 'ui-box';
import { File as Files, getPiece, IsSumEven, parseCode } from 'chess/es';

const File = ({ rankName, snapshot }) => {
  const extractCode = useCallback(
    (tileName) => {
      const matchTilename = compose(
        equals(tileName),
        prop('tileName'),
        parseCode
      );

      return snapshot.find(matchTilename);
    },
    [snapshot]
  );

  return Files.map((fileName) => {
    const isDark = IsSumEven({ rankName, fileName });
    const bg = isDark ? '#eaeaea' : '#fff';
    const tileName = `${fileName}${rankName}`;
    const Piece = compose(
      getPiece,
      prop('pKey'),
      parseCode,
      defaultTo(''),
      extractCode
    )(tileName);

    return (
      <Box
        key={fileName}
        flex="1"
        data-rank={rankName}
        data-file={fileName}
        backgroundColor={bg}
        position="relative"
      >
        <Box position="absolute" padding={5} color="#ccc">
          {tileName}
        </Box>

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
