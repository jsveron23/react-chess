import PropTypes from 'prop-types';
import { FlexRow, FlexOne, Sticky, Text } from 'ui/es';
import { useTheme } from '~/hooks';

const NotationHeader = ({ data }) => {
  const { border, color } = useTheme();

  return (
    <Sticky borderBottom={border} backgroundColor={color.white}>
      <FlexRow justifyContent="space-between">
        {data.map((side) => {
          const reColor = color.invert[side.toLowerCase()];

          return (
            <FlexOne
              key={side}
              textAlign="center"
              backgroundColor={reColor.bgColor}
              color={reColor.color}
              padding={5}
            >
              <Text fontWeight="bold">{side}</Text>
            </FlexOne>
          );
        })}
      </FlexRow>
    </Sticky>
  );
};

NotationHeader.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOf(['White', 'Black'])).isRequired,
};

NotationHeader.defaultProps = {};

export default NotationHeader;
