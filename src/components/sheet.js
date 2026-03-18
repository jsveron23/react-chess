import { memo, useState } from 'react';
import { reverse } from 'ramda';
import equal from 'fast-deep-equal/es6/react';
import { useTheme } from '~/hooks';
import { NotationHeader } from './sheet/notation-header';
import { NotationBody } from './sheet/notation-body';
import { Notation } from './sheet/notation';
import { CpuAnalysisDialog } from './sheet/cpu-analysis-dialog';

/**
 * Move notation sheet showing the full game history as a two-column table.
 * CPU moves are clickable and open CpuAnalysisDialog with the eval data.
 * Memoized with deep equality to avoid re-renders on unrelated state changes.
 * @param {{ data: Array, depth: number }} props
 */
const Sheet = memo(({ data, depth }) => {
  const { color } = useTheme();
  const [analysisMove, setAnalysisMove] = useState(null);

  return (
    <>
      <NotationHeader data={['White', 'Black']} />
      <NotationBody data={reverse(data)}>
        {({ white, black }) => (
          <>
            <Notation sideData={white} onAnalyze={setAnalysisMove} />
            <Notation
              sideData={black}
              backgroundColor={color.black}
              color={color.white}
              onAnalyze={setAnalysisMove}
            />
          </>
        )}
      </NotationBody>
      {analysisMove && (
        <CpuAnalysisDialog
          sideData={analysisMove}
          depth={depth}
          onClose={() => setAnalysisMove(null)}
        />
      )}
    </>
  );
}, equal);

export { Sheet };
