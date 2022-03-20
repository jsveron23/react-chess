import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';
import Logo from '~/assets/logo.svg';
import Flex from './Flex';
import Button from './Button';

const Main = ({ children }) => {
  const width = window.innerHeight;
  const minMaxWidth = window.innerHeight + 300;

  return (
    <Flex
      flexDirection="row"
      height="100vh"
      minWidth={minMaxWidth}
      maxWidth={minMaxWidth}
    >
      <Box flexBasis={width}>{children}</Box>

      <Box
        flex="1"
        backgroundColor="#e1e1e1"
        borderLeft="1px solid #cacaca"
        borderRight="1px solid #cacaca"
      >
        <Flex flexDirection="column">
          <Box is="h1" textAlign="center" marginTop={30}>
            React-Chess
          </Box>
          <Flex is="figure" justifyContent="center">
            <Logo width="100px" height="auto" />
          </Flex>
        </Flex>

        <Box padding={20} marginTop={20}>
          <Flex flexDirection="column" gap={10} alignItems="center">
            <Button>1 vs 1</Button>
            <Button disabled>1 vs CPU</Button>
            <Button disabled>Import</Button>
            <Button disabled>Export</Button>
            <Button disabled>Observe</Button>
            <Button disabled>Online</Button>
          </Flex>
        </Box>

        <Box>Sheet</Box>
      </Box>
    </Flex>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(Main);
