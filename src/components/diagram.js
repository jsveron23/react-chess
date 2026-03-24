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
  const dispatch = useDispatch();

  const isUndoAction = future.length > 0;
  const isCpuTurn = matchType === ONE_VS_CPU && turn === cpuTurn;
  const isBlack = matchType === ONE_VS_CPU && playerSide === Side.black;
  const preventEvent = isCpuTurn;

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
    if (preventEvent) return;

    const isPieceTile = validateCode(pretendCode);
    const isOTW = includes(nextTileName, movableTiles);
    const isSameSide = isPieceTile && detectTurn(turn, pretendCode);
    const detectEnemy = detectEnemyOnTiles(movableTiles, selectedCode);
    const isEnemyTile = isPieceTile && detectEnemy(pretendCode, nextTileName);
    const isMovable = !isPieceTile && !isSameSide && isOTW;

    if (isSameSide) dispatch(updateSelectedCode(pretendCode));
    if (isEnemyTile) dispatch(capturePiece(pretendCode, nextTileName));
    if (isMovable) dispatch(movePiece(nextTileName));
  };

  return (
    <DiagramProvider
      value={{
        flip: flipState !== isBlack,
        animate: isUndoAction ? undefined : animate,
        getPKey: getPKeyByTile(snapshot),
        detectOn: flippedIncludes([selectedCode, ...movableTiles]),
        checkCode: attackerCode ? kingCode : '',
        checkRoute: attackerRoutes,
        detectEnemy: detectEnemyOnTiles(movableTiles, selectedCode),
        onClickTile,
        checkDefenders: defenders,
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
