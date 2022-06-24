import { memo } from 'react';
import PropTypes from 'prop-types';
import { FlexRow, FlexOne, Text } from 'ui/es';
import { useTheme } from '~/hooks';

const PeerId = ({ peerId }) => {
  const { weight } = useTheme();

  return (
    <FlexRow paddingLeft={10} paddingRight={10} fontSize="80%">
      <Text marginBottom={5} fontWeight={weight.bold} flexBasis={60}>
        Peer Id:
      </Text>

      {peerId && (
        <FlexOne is={Text} wordBreak="break-all">
          {peerId}
        </FlexOne>
      )}
    </FlexRow>
  );
};

PeerId.propTypes = {
  peerId: PropTypes.string,
};

PeerId.defaultProps = {
  peerId: '',
};

export default memo(PeerId);
