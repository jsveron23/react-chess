import { memo } from 'react';
import PropTypes from 'prop-types';
import { Absolute } from 'ui/es';

const Mask = ({ isCodeMatched }) => {
  return (
    <Absolute
      top={0}
      bottom={0}
      left={0}
      right={0}
      margin={1}
      backgroundColor={isCodeMatched ? 'rgba(100, 100, 100, 0.3)' : 'auto'}
      border={isCodeMatched ? '2px dashed #999' : 'none'}
    />
  );
};

Mask.propTypes = {
  isCodeMatched: PropTypes.bool,
};

Mask.defaultProps = {
  isCodeMatched: false,
};

export default memo(Mask);
