import PropTypes from 'prop-types';
import { equals, includes } from 'ramda';
import { Absolute } from 'ui/es';
import { useDiagram } from '~/hooks';

const Mask = ({ tileName, pretendCode }) => {
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

  let bg = isRoute ? 'rgba(220, 20, 60, 0.1)' : 'auto';
  bg = isOnMt ? 'rgba(200, 200, 200, 1)' : bg;
  bg = isEnemy ? 'rgba(220, 20, 60, 1)' : bg;

  let border = isOnMt ? '2px solid #aaa' : 'none';
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
  tileName: PropTypes.string.isRequired,
  pretendCode: PropTypes.string.isRequired,
};

export default Mask;
