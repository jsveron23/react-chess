import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { compose, prop, equals, defaultTo } from 'ramda';
import Box from 'ui-box';
import { File as Files, getPiece, IsSumEven, parseCode } from 'chess/es';
import useTheme from '~/styles/useTheme';

const File = ({ rankName, snapshot }) => {
  const { tile } = useTheme();
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

  const handleClick = useCallback(
    (code) => () => {
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
    // TODO rename IsDark
    const isDark = IsSumEven({ rankName, fileName });
    const bg = isDark ? tile.dark : tile.light;
    const tileName = `${fileName}${rankName}`;
    const pKey = compose(
      prop('pKey'),
      parseCode,
      defaultTo(''),
      extractCode
    )(tileName);
    const Piece = getPiece(pKey);

    return (
      <Box
        key={fileName}
        flex="1"
        data-rank={rankName}
        data-file={fileName}
        data-tile={tileName}
        backgroundColor={bg}
        position="relative"
        onClick={handleClick(pKey ? `${pKey}${tileName}` : '')}
      >
        <Box position="absolute" padding={5} color={tile.text}>
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
