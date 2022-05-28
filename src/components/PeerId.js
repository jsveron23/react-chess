import { memo } from 'react';
import PropTypes from 'prop-types';
import { FlexRow, Text } from 'ui/es';

const PeerId = ({ peerId }) => {
  return (
    <FlexRow paddingLeft={10} paddingRight={10} fontSize="80%">
      <Text marginBottom={5} fontWeight="bold" flexBasis={60}>
        Peer Id:
      </Text>
      {peerId && (
        <Text flex="1" wordBreak="break-all">
          {peerId}
        </Text>
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
