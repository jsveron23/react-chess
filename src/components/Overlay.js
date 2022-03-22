import React from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';
import { Flex, FlexCol, Button } from 'ui/es';

const Overlay = ({ matchType }) => {
  if (matchType) {
    return '';
  }

  return (
    <Box
      position="absolute"
      backgroundColor="rgba(200, 200, 200, .8)"
      width="100%"
      height="100%"
      zIndex="1"
    >
      <Flex justifyContent="center" alignItems="center" height="100%">
        <FlexCol
          gap={20}
          backgroundColor="#eaeaea"
          padding={40}
          borderRadius={6}
        >
          <Box is="strong">Welcome to React-Chess</Box>
          <Button disabled>Resume</Button>
        </FlexCol>
      </Flex>
    </Box>
  );
};

Overlay.propTypes = {
  matchType: PropTypes.string,
};

Overlay.defaultProps = {
  matchType: '',
};

export default Overlay;
