import { memo } from 'react';
import PropTypes from 'prop-types';
import { Absolute } from 'ui/es';

const Mask = ({ isInWay, isEnemy }) => {
  let bg = isInWay ? 'rgba(100, 100, 100, 0.3)' : 'auto';
  bg = isEnemy ? 'rgba(220, 20, 60, 0.3)' : bg;

  let border = isInWay ? '2px dashed #999' : 'none';
  border = isEnemy ? '2px dashed red' : border;

  return (
    <Absolute
      top={0}
      bottom={0}
      left={0}
      right={0}
      margin={1}
      backgroundColor={bg}
      border={border}
    />
  );
};

Mask.propTypes = {
  isInWay: PropTypes.bool,
  isEnemy: PropTypes.bool,
};

Mask.defaultProps = {
  isInWay: false,
  isEnemy: false,
};

export default memo(Mask);
