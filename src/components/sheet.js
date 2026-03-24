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
  const dispatch = useDispatch();
  const onAnalyze = (sideData) => dispatch(selectAnalysis(sideData));
  const { color } = useTheme();

  return (
    <>
      <NotationHeader data={['White', 'Black']} />
      <NotationBody data={reverse(data)}>
        {({ white, black }) => (
          <>
            <Notation sideData={white} onAnalyze={onAnalyze} />
            <Notation
              sideData={black}
              backgroundColor={color.black}
              color={color.white}
              onAnalyze={onAnalyze}
            />
          </>
        )}
      </NotationBody>
    </>
  );
}, equal);

export { Sheet };
