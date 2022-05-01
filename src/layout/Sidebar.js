import { memo } from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';
import useTheme from '~/styles/useTheme';

function Sidebar({ children, ...props }) {
  const { sidebar, border } = useTheme();

  return (
    <Box
      flex="1"
      backgroundColor={sidebar.bg}
      borderLeft={border}
      borderRight={border}
      {...props}
    >
      {children}
    </Box>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(Sidebar);
