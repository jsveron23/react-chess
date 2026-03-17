import { memo } from 'react';
import { FlexRow, Text, Button } from 'ui/es';

const CpuSideSelector = memo(({ playerSide, onSelect }) => {
  return (
    <FlexRow
      paddingLeft={10}
      paddingRight={10}
      paddingTop={4}
      paddingBottom={4}
      gap={6}
      alignItems="center"
      fontSize="80%"
    >
      <Text flexShrink={0} marginRight={4}>
        Play as:
      </Text>

      <Button
        width="auto"
        paddingLeft={10}
        paddingRight={10}
        disabled={playerSide === 'w'}
        onClick={() => onSelect('w')}
      >
        White
      </Button>

      <Button
        width="auto"
        paddingLeft={10}
        paddingRight={10}
        disabled={playerSide === 'b'}
        onClick={() => onSelect('b')}
      >
        Black
      </Button>
    </FlexRow>
  );
});

CpuSideSelector.displayName = 'CpuSideSelector';

export { CpuSideSelector };
