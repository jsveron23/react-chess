import PropTypes from 'prop-types';
import { Absolute, FlexCol, FlexMiddle, Button, Text } from 'ui/es';
import useTheme from '~/styles/useTheme';

const Overlay = ({ matchType }) => {
  const { overlay, borderRadius } = useTheme();

  if (matchType) {
    return '';
  }

  return (
    <Absolute
      backgroundColor={overlay.bg}
      width="100%"
      height="100%"
      zIndex="1"
    >
      <FlexMiddle height="100%">
        <FlexCol
          gap={20}
          backgroundColor={overlay.modal.bg}
          padding={40}
          borderRadius={borderRadius}
        >
          <Text is="strong">Welcome to React-Chess</Text>
          <Button disabled>Resume</Button>
        </FlexCol>
      </FlexMiddle>
    </Absolute>
  );
};

Overlay.propTypes = {
  matchType: PropTypes.string,
};

Overlay.defaultProps = {
  matchType: '',
};

export default Overlay;
