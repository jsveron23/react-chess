import { FlexCol } from 'ui/es';
import { DiagramProvider } from '~/hooks';
import { Rank } from './diagram/rank';

const Diagram = ({
  flip,
  animate = { targetCode: '', from: { x: 0, y: 0 } },
  getPKey,
  detectOn,
  checkCode = '',
  checkRoute = [],
  detectEnemy,
  onClickTile,
  checkDefenders = [],
  detectEnPassantTile,
}) => {
  return (
    <DiagramProvider
      value={{
        flip,
        animate,
        getPKey,
        detectOn,
        checkCode,
        checkRoute,
        detectEnemy,
        onClickTile,
        checkDefenders,
        detectEnPassantTile,
      }}
    >
      <FlexCol height="100%">
        <Rank />
      </FlexCol>
    </DiagramProvider>
  );
};

export { Diagram };
