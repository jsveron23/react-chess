import { memo } from 'react';
import PropTypes from 'prop-types';
import { Absolute } from 'ui/es';

const Mask = ({
  tileName,
  pretendCode,
  detectOTWByCode,
  detectEnemy,
  detectEnPassantTile,
}) => {
  const isOTW = detectOTWByCode(pretendCode);
  const isEnemy =
    detectEnemy(pretendCode, tileName) || detectEnPassantTile(tileName);

  let bg = isOTW ? 'rgba(200, 200, 200, 1)' : 'auto';
  bg = isEnemy ? 'rgba(220, 20, 60, 1)' : bg;

  let border = isOTW ? '2px solid #999' : 'none';
  border = isEnemy ? '2px solid red' : border;

  return (
    <Absolute
      top={0}
      bottom={0}
      left={0}
      right={0}
      margin={8}
      backgroundColor={bg}
      border={border}
    />
  );
};

Mask.propTypes = {
  detectOTWByCode: PropTypes.func.isRequired,
  detectEnemy: PropTypes.func.isRequired,
  detectEnPassantTile: PropTypes.func.isRequired,
  tileName: PropTypes.string.isRequired,
  pretendCode: PropTypes.string.isRequired,
};

export default memo(Mask);
