import { connect } from 'react-redux';
import memoizeOne from 'memoize-one';
import { compose, prop, defaultTo } from 'ramda';
import { parseCode, validateCode, findCodeByTile } from 'chess/es';
import { Diagram } from '~/components';
import { updateSelectedCode, movePiece } from '~/store/actions';

const getPKey = memoizeOne(function getPKey(snapshot) {
  return (tileName) =>
    compose(
      prop('pKey'),
      parseCode,
      defaultTo(''),
      findCodeByTile(snapshot)
    )(tileName);
});

function mapStateToProps({
  ingame: {
    present: { selectedCode, movableTiles, snapshot },
  },
}) {
  const props = {
    getPKey: getPKey(snapshot),
    selectedCode,
    snapshot,
    movableTiles,
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
