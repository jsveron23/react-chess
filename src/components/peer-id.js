import { memo } from 'react';
import { FlexRow, FlexOne, Text } from 'ui/es';
import { useTheme } from '~/hooks';

const PeerId = memo(({ peerId }) => {
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
});

export { PeerId };
