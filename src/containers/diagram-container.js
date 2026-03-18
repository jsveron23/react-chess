import { connect } from 'react-redux';
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
import { Diagram } from '~/components';
import { updateSelectedCode, movePiece, capturePiece } from '~/store/actions';
import { ONE_VS_CPU } from '~/presets';

const convertToTiles = memoizeOne(convertAxisListToTiles);
const detectPawn = memoizeOne(detectPiece.Pawn);
const flippedIncludes = flip(includes);

const mapStateToProps = ({
  ai: { cpuTurn, playerSide },
  general: { flip: flipState, matchType },
  network: { side, connected, awaiting },
  ingame: {
    present: {
      checkData: { kingCode, attackerCode, attackerRoutes, defenders } = {
        /* NOTE set default value(empty object) for legacy code */
      },
      selectedCode,
      movableTiles,
      snapshot,
      turn,
    },
    future,
  },
  animate,
}) => {
  const isUndoAction = future.length > 0;
  const isAwating = connected && awaiting;
  const isCpuTurn = matchType === ONE_VS_CPU && turn === cpuTurn;
  const isBlack =
    (connected && side === Side.black) ||
    (matchType === ONE_VS_CPU && playerSide === Side.black);

  return {
    detectEnPassantTile(tileName) {
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
    },
    getPKey: getPKeyByTile(snapshot),
    detectOn: flippedIncludes([selectedCode, ...movableTiles]),
    detectEnemy: detectEnemyOnTiles(movableTiles, selectedCode),
    checkCode: attackerCode ? kingCode : '',
    checkRoute: attackerRoutes,
    checkDefenders: defenders,
    preventEvent: isAwating || isCpuTurn,
    animate: isUndoAction ? undefined : animate,
    flip: flipState || isBlack,
    movableTiles,
    turn,
  };
};

const mapDispatchToProps = (dispatch) => ({
  decideAction(getArgs, getState) {
    const { nextTileName, pretendCode } = getArgs();
    const { turn, detectEnemy, movableTiles } = getState();
    const isPieceTile = validateCode(pretendCode);
    const isOTW = includes(nextTileName, movableTiles);
    const isSameSide = isPieceTile && detectTurn(turn, pretendCode);
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
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  // this callback has been executed from `<Tile />.onClickTile`
  onClickTile(nextTileName, pretendCode) {
    if (stateProps.preventEvent) {
      return;
    }

    // HOF
    dispatchProps.decideAction(
      // get arguments from actual callback
      () => ({ nextTileName, pretendCode }),

      // state from `mapStateToProps`
      () => stateProps
    );
  },
});

const DiagramContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Diagram);

export { DiagramContainer };
