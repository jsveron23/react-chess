import { connect } from 'react-redux';
import { compose, flip, intersection, includes } from 'ramda';
import memoizeOne from 'memoize-one';
import {
  detectEnemyOnTiles,
  validateCode,
  getPKeyByTile,
  detectTurn,
  detectPiece,
  convertAxisListToTiles,
} from 'chess/es';
import { Diagram } from '~/components';
import { updateSelectedCode, movePiece, capturePiece } from '~/store/actions';

const convertToTiles = memoizeOne(convertAxisListToTiles);
const detectPawn = memoizeOne(detectPiece.Pawn);

function mapStateToProps({
  network: { connected, awaiting },
  ingame: {
    present: {
      checkData: { kingCode, attackerCode, attackerRoutes, defenders } = {
        /* NOTE for legacy code */
      },
      selectedCode,
      movableTiles,
      snapshot,
      turn,
    },
    future,
  },
  animate,
}) {
  return {
    detectEnPassantTile(tileName) {
      const isPawn = detectPawn(selectedCode);
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

      return isPawn && isEnemyTile;
    },
    getPKey: getPKeyByTile(snapshot),
    detectEnemy: detectEnemyOnTiles(movableTiles, selectedCode),
    detectOTWByCode: flip(includes)([selectedCode, ...movableTiles]),
    checkCode: attackerCode ? kingCode : '',
    checkRoute: attackerRoutes,
    checkDefenders: defenders,
    preventEvent: connected && awaiting,
    animate: future.length > 0 ? undefined : animate,
    movableTiles,
    turn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
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
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Diagram);
