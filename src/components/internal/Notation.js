import { memo } from 'react';
import PropTypes from 'prop-types';
import { parseNotation } from 'chess/es';
import Box from 'ui-box';

const Notation = ({ sideData, ...props }) => {
  return (
    <Box
      flex="1"
      textAlign="center"
      backgroundColor="#white"
      color="#000"
      padding={5}
      {...props}
    >
      {sideData && parseNotation(sideData)}
    </Box>
  );
};

Notation.propTypes = {
  sideData: PropTypes.shape({
    from: PropTypes.arrayOf(PropTypes.string),
    to: PropTypes.arrayOf(PropTypes.string),
    check: PropTypes.shape({
      from: PropTypes.string,
      defenders: PropTypes.arrayOf(PropTypes.string),
      defendTiles: PropTypes.arrayOf(PropTypes.string),
      dodgeableTiles: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

Notation.defaultProps = {
  sideData: null,
};

export default memo(Notation);
