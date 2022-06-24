import PropTypes from 'prop-types';
import { parseNotation } from 'chess/es';
import { FlexOne, Text } from 'ui/es';
import { useTheme } from '~/hooks';

const Notation = ({ sideData, ...props }) => {
  const { color } = useTheme();

  return (
    <FlexOne
      is={Text}
      textAlign="center"
      backgroundColor={color.white}
      color={color.black}
      padding={5}
      {...props}
    >
      {sideData && parseNotation(sideData)}
    </FlexOne>
  );
};

Notation.propTypes = {
  sideData: PropTypes.shape({
    from: PropTypes.arrayOf(PropTypes.string),
    to: PropTypes.arrayOf(PropTypes.string),
    check: PropTypes.shape({
      attackerCode: PropTypes.string,
      defenders: PropTypes.arrayOf(PropTypes.string),
      defendTiles: PropTypes.arrayOf(PropTypes.string),
      dodgeableTiles: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

Notation.defaultProps = {
  sideData: null,
};

export default Notation;
