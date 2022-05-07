import { memo } from 'react';
import PropTypes from 'prop-types';
import { equals, includes } from 'ramda';
import { Absolute } from 'ui/es';

const Mask = ({
  checkCode,
  checkRoute,
  checkDefenders,
  tileName,
  pretendCode,
  detectOTWByCode,
  detectEnemy,
  detectEnPassantTile,
}) => {
  const isOTW = detectOTWByCode(pretendCode);
  const isDefender = includes(pretendCode, checkDefenders);
  const isRoute = includes(tileName, checkRoute);
  const isEnemy =
    detectEnemy(pretendCode, tileName) ||
    detectEnPassantTile(tileName) ||
    equals(checkCode, pretendCode);

  let bg = isRoute ? 'rgba(220, 20, 60, 0.1)' : 'auto';
  bg = isOTW ? 'rgba(200, 200, 200, 1)' : bg;
  bg = isEnemy ? 'rgba(220, 20, 60, 1)' : bg;

  let border = isOTW ? '2px solid #aaa' : 'none';
  border = isDefender ? '2px dotted green' : border;
  border = isEnemy ? '2px solid red' : border;

  return (
    <Absolute
      top={0}
      bottom={0}
      left={0}
      right={0}
      margin={24}
      backgroundColor={bg}
      border={border}
      borderRadius={6}
    />
  );
};

Mask.propTypes = {
  detectOTWByCode: PropTypes.func.isRequired,
  detectEnemy: PropTypes.func.isRequired,
  detectEnPassantTile: PropTypes.func.isRequired,
  tileName: PropTypes.string.isRequired,
  pretendCode: PropTypes.string.isRequired,
  checkRoute: PropTypes.arrayOf(PropTypes.string),
  checkDefenders: PropTypes.arrayOf(PropTypes.string),
  checkCode: PropTypes.string,
};

Mask.defaultProps = {
  checkCode: '',
  checkRoute: [],
  checkDefenders: [],
};

export default memo(Mask);
