import { memo, useState, useEffect } from 'react';
import { Flex, FlexOne, FlexRow, FlexMiddle, Text, Loading } from 'ui/es';
import { useTheme } from '~/hooks';

const NotiBar = memo(({ turn, connected, awaiting, thinking }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!thinking) {
      setElapsed(0);

      return;
    }

    const id = setInterval(() => setElapsed((s) => s + 1), 1000);

    return () => clearInterval(id);
  }, [thinking]);
  const { border, color, weight } = useTheme();
  const cs = color.invert[turn];
  const isAwaiting = connected && awaiting;
  const isTurn = connected && !awaiting;

  return (
    <FlexRow borderTop={border}>
      <FlexMiddle
        flexBasis={30}
        backgroundColor={cs.bgColor}
        color={cs.color}
        textTransform="uppercase"
        fontWeight={weight.bold}
        borderRight={border}
      >
        {turn.substring(0, 1)}
      </FlexMiddle>

      <FlexOne
        is={Flex}
        alignItems="center"
        justifyContent="flex-start"
        backgroundColor={color.gray3}
        color={color.black}
        height={40}
        paddingLeft={10}
        paddingRight={10}
      >
        <Loading
          text={`...Thinking... ${elapsed}s`}
          size={20}
          loading={thinking}
        />
        <Loading text="...Awaiting..." size={20} loading={isAwaiting} />

        {isTurn && <Text marginRight={10}>...Your turn...</Text>}
      </FlexOne>
    </FlexRow>
  );
});

export { NotiBar };
