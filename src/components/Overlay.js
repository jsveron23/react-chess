import React from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';
import { Flex, FlexCol, Button } from 'ui/es';
import useTheme from '~/styles/useTheme';

const Overlay = ({ matchType }) => {
  const { overlay, borderRadius } = useTheme();

  if (matchType) {
    return '';
  }

  return (
    <Box
      position="absolute"
      backgroundColor={overlay.bg}
      width="100%"
      height="100%"
      zIndex="1"
    >
      <Flex justifyContent="center" alignItems="center" height="100%">
        <FlexCol
          gap={20}
          backgroundColor={overlay.modal.bg}
          padding={40}
          borderRadius={borderRadius}
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
