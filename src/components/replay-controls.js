import { useSelector, useDispatch } from 'react-redux';
import { FlexCol, FlexRow, Text, Button } from 'ui/es';
import { nextStep, prevStep, stopReplay } from '~/store/slices/replay';
import { useTheme } from '~/hooks';

const ReplayControls = () => {
  const { color } = useTheme();
  const { currentGame, currentStep } = useSelector(({ replay }) => replay);
  const dispatch = useDispatch();

  if (!currentGame) return null;

  const total = currentGame.snapshots.length - 1;
  const dateStr = new Date(currentGame.date).toLocaleDateString();
  const resultText =
    currentGame.winner === 'Draw'
      ? 'Immediate draw (Stalemate)'
      : `${currentGame.winner} wins`;

  return (
    <FlexCol gap={10} alignItems="center">
      <FlexRow gap={6}>
        <Button
          width="auto"
          paddingLeft={10}
          paddingRight={10}
          disabled={currentStep === 0}
          onClick={() => dispatch(prevStep())}
        >
          Prev
        </Button>
        <Button
          width="auto"
          paddingLeft={10}
          paddingRight={10}
          disabled={currentStep === total}
          onClick={() => dispatch(nextStep())}
        >
          Next
        </Button>
      </FlexRow>
      <Text fontSize={13} color={color.gray4}>
        Move {currentStep} / {total}
      </Text>
      <Text fontSize={13} color={color.gray4}>
        {resultText} — {dateStr}
      </Text>
      <Button onClick={() => dispatch(stopReplay())}>Exit Replay</Button>
    </FlexCol>
  );
};

export { ReplayControls };
