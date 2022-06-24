import PropTypes from 'prop-types';
import { equals, includes } from 'ramda';
import { Absolute } from 'ui/es';
import { useTheme, useDiagram } from '~/hooks';

const Mask = ({ tileName, pretendCode }) => {
  const { color } = useTheme();
  const {
    detectOn,
    checkCode,
    checkRoute,
    checkDefenders,
    detectEnemy,
    detectEnPassantTile,
  } = useDiagram();
  const isOnMt = detectOn(pretendCode);
  const isDefender = includes(pretendCode, checkDefenders);
  const isRoute = includes(tileName, checkRoute);
  const isEnemy =
    detectEnemy(pretendCode, tileName) ||
    detectEnPassantTile(tileName) ||
    equals(checkCode, pretendCode);

  let bg = isRoute ? color.crimson_light : 'auto';
  bg = isOnMt ? color.gray5 : bg;
  bg = isEnemy ? color.crimson : bg;

  let border = isOnMt ? `2px solid ${color.gray4}` : 'none';
  border = isDefender ? `2px dotted ${color.green}` : border;
  border = isEnemy ? `2px solid ${color.red}` : border;

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
  tileName: PropTypes.string.isRequired,
  pretendCode: PropTypes.string.isRequired,
};

export default Mask;
