import { connect } from 'react-redux';
import { includes } from 'ramda';
import { detectEnemy, validateCode, getPKeyBy, detectTurn } from 'chess/es';
import { Diagram } from '~/components';
import { updateSelectedCode, movePiece, capturePiece } from '~/store/actions';

function mapStateToProps({
  ingame: {
    present: { turn, selectedCode, movableTiles, snapshot },
  },
}) {
  return {
    getPKey: getPKeyBy(snapshot),
    detectEnemy: detectEnemy(movableTiles, selectedCode),
    detectInMT: (code) => includes(code, [selectedCode, ...movableTiles]),
    movableTiles,
    selectedCode,
    turn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClickTile(getArgs, getState) {
      const { nextTileName, pretendCode } = getArgs();
      const { turn, detectEnemy, movableTiles } = getState();
      const isPieceTile = validateCode(pretendCode);

      // TODO investigate, why no `detectEnemy(pretendCode, nextTileName)`
      const isOpponent = detectTurn(turn, pretendCode);

      // only detect tile, not code(piece)
      const isMovableTile = movableTiles.indexOf(nextTileName) > -1;

      if (isMovableTile) {
        if (isPieceTile && detectEnemy(pretendCode, nextTileName)) {
          dispatch(capturePiece(pretendCode, nextTileName));
        } else if (!isPieceTile && !isOpponent) {
          dispatch(movePiece(nextTileName));
        }
      }

      if (isPieceTile && isOpponent) {
        dispatch(updateSelectedCode(pretendCode));
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
      // HOF
      dispatchProps.onClickTile(
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
