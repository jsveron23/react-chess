import { useSelector, useDispatch } from 'react-redux';
import { compose, flip, intersection, includes } from 'ramda';
import memoizeOne from 'memoize-one';
import {
  Side,
  detectEnemyOnTiles,
  validateCode,
  getPKeyByTile,
  detectTurn,
  detectPiece,
  convertAxisListToTiles,
} from 'chess/es';
import { FlexCol } from 'ui/es';
import { DiagramProvider } from '~/hooks';
import { updateSelectedCode, movePiece, capturePiece } from '~/store/actions';
import { ONE_VS_CPU } from '~/presets';
import { Rank } from './diagram/rank';

const convertToTiles = memoizeOne(convertAxisListToTiles);
const detectPawn = memoizeOne(detectPiece.Pawn);
const flippedIncludes = flip(includes);

const Diagram = () => {
  const { cpuTurn, playerSide } = useSelector(({ ai }) => ai);
  const { flip: flipState, matchType } = useSelector(({ general }) => general);
  const {
    checkData: { kingCode, attackerCode, attackerRoutes, defenders } = {},
    selectedCode,
    movableTiles,
    snapshot,
    turn,
  } = useSelector(({ ingame }) => ingame.present);
  const future = useSelector(({ ingame }) => ingame.future);
  const animate = useSelector(({ animate: a }) => a);
  const { isReplaying, currentGame, currentStep } = useSelector(
    ({ replay }) => replay
  );
  const dispatch = useDispatch();

  const isUndoAction = future.length > 0;
  const isCpuTurn = matchType === ONE_VS_CPU && turn === cpuTurn;
  const isBlack = matchType === ONE_VS_CPU && playerSide === Side.black;
  const preventEvent = isCpuTurn;

  const replaySnapshot =
    isReplaying && currentGame ? currentGame.snapshots[currentStep] : null;

  const replayCheckData =
    isReplaying && currentGame?.checkDataList
      ? currentGame.checkDataList[currentStep] || {}
      : null;

  const detectEnPassantTile = (tileName) => {
    let isEnemyTile = false;
    if (selectedCode) {
      isEnemyTile = compose(
        includes(tileName),
        intersection(movableTiles),
        convertToTiles(selectedCode)
      )([
        [1, 1],
        [-1, 1],
      ]);
    }

    return detectPawn(selectedCode) && isEnemyTile;
  };

  const onClickTile = (nextTileName, pretendCode) => {
    if (preventEvent) {
      return;
    }

    const isPieceTile = validateCode(pretendCode);
    const isOTW = includes(nextTileName, movableTiles);
    const isSameSide = isPieceTile && detectTurn(turn, pretendCode);
    const detectEnemy = detectEnemyOnTiles(movableTiles, selectedCode);
    const isEnemyTile = isPieceTile && detectEnemy(pretendCode, nextTileName);
    const isMovable = !isPieceTile && !isSameSide && isOTW;

    if (isSameSide) {
      dispatch(updateSelectedCode(pretendCode));
    }
    if (isEnemyTile) {
      dispatch(capturePiece(pretendCode, nextTileName));
    }
    if (isMovable) {
      dispatch(movePiece(nextTileName));
    }
  };

  return (
    <DiagramProvider
      value={{
        flip: flipState !== isBlack,
        animate: isUndoAction
          ? { targetCode: '', from: { x: 0, y: 0 } }
          : animate,
        getPKey: getPKeyByTile(replaySnapshot || snapshot),
        detectOn: isReplaying
          ? () => false
          : flippedIncludes([selectedCode, ...movableTiles]),
        checkCode: isReplaying
          ? replayCheckData?.attackerCode
            ? replayCheckData.kingCode
            : ''
          : attackerCode
          ? kingCode
          : '',
        checkRoute: isReplaying
          ? replayCheckData?.attackerRoutes || []
          : attackerRoutes,
        detectEnemy: isReplaying
          ? () => false
          : detectEnemyOnTiles(movableTiles, selectedCode),
        onClickTile: isReplaying ? () => {} : onClickTile,
        checkDefenders: isReplaying
          ? replayCheckData?.defenders || []
          : defenders,
        detectEnPassantTile: isReplaying ? () => false : detectEnPassantTile,
      }}
    >
      <FlexCol height="100%">
        <Rank />
      </FlexCol>
    </DiagramProvider>
  );
};

export { Diagram };
