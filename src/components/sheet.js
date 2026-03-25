import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reverse } from 'ramda';
import equal from 'fast-deep-equal/es6/react';
import { useTheme } from '~/hooks';
import { selectAnalysis } from '~/store/slices/analysis';
import { NotationHeader } from './sheet/notation-header';
import { NotationBody } from './sheet/notation-body';
import { Notation } from './sheet/notation';

const Sheet = memo(() => {
  const data = useSelector(({ ingame }) => ingame.present.sheetData);
  const { isReplaying, currentGame, currentStep } = useSelector(
    ({ replay }) => replay
  );
  const dispatch = useDispatch();
  const onAnalyze = (sideData) => dispatch(selectAnalysis(sideData));
  const { color } = useTheme();

  const sheetData =
    isReplaying && currentGame?.sheetData ? currentGame.sheetData : data;

  const moveIndex = isReplaying ? currentStep - 1 : -1;
  const activeRow = moveIndex >= 0 ? Math.floor(moveIndex / 2) : -1;
  const activeSide =
    moveIndex >= 0 ? (moveIndex % 2 === 0 ? 'white' : 'black') : null;

  // Tag each row with active-side info so NotationBody children can use it
  const taggedData = reverse(
    sheetData.map((row, idx) => ({
      ...row,
      _activeWhite: activeRow === idx && activeSide === 'white',
      _activeBlack: activeRow === idx && activeSide === 'black',
    }))
  );

  return (
    <>
      <NotationHeader data={['White', 'Black']} />
      <NotationBody data={taggedData}>
        {({ white, black, _activeWhite, _activeBlack }) => (
          <>
            <Notation
              sideData={white}
              onAnalyze={isReplaying ? null : onAnalyze}
              backgroundColor={_activeWhite ? color.gray1 : undefined}
            />
            <Notation
              sideData={black}
              backgroundColor={_activeBlack ? color.gray2 : color.black}
              color={_activeBlack ? color.black : color.white}
              onAnalyze={isReplaying ? null : onAnalyze}
            />
          </>
        )}
      </NotationBody>
    </>
  );
}, equal);

export { Sheet };
