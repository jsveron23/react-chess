import React from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';
import Rank from './Rank';

const Diagram = ({ snapshot }) => {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Rank snapshot={snapshot} />
    </Box>
  );
};

Diagram.propTypes = {
  snapshot: PropTypes.arrayOf().isRequired,
};

export default Diagram;
