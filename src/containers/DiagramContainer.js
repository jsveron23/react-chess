import { connect } from 'react-redux';
import { compose, prop, defaultTo } from 'ramda';
import { parseCode, validateCode, findCodeByTile } from 'chess/es';
import { Diagram } from '~/components';
import { updateSelectedCode, movePiece } from '~/store/actions';

function mapStateToProps({
  ingame: {
    present: { selectedCode, movableTiles, snapshot },
  },
}) {
  const props = {
    selectedCode,
    snapshot,
    movableTiles,

    // TODO optimize it
    getPKey(tileName) {
      return compose(
        prop('pKey'),
        parseCode,
        defaultTo(''),
        findCodeByTile(snapshot)
      )(tileName);
    },
  };

  return props;
}

function mapDispatchToProps(dispatch) {
  return {
    onClickTile(movableTiles, nextTileName, pretendCode) {
      const isPieceTile = validateCode(pretendCode);
      const isMovableTile = movableTiles.indexOf(nextTileName) > -1;

      if (isPieceTile) {
        dispatch(updateSelectedCode(pretendCode));
      } else if (isMovableTile) {
        dispatch(movePiece(nextTileName));
      }
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Diagram);
