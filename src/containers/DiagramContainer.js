import { connect } from 'react-redux';
import { compose, prop, defaultTo } from 'ramda';
import { parseCode, findCode, detectDarkTile } from 'chess/es';
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

    getTileBg(tile, fileName, rankName) {
      const isDark = detectDarkTile(rankName, fileName);

      return isDark ? tile.dark : tile.light;
    },

    getPKey(tileName) {
      return compose(
        prop('pKey'),
        parseCode,
        defaultTo(''),
        findCode(snapshot)
      )(tileName);
    },
  };

  return props;
}

const DiagramContainer = connect(mapStateToProps, {
  updateSelectedCode,
  movePiece,
})(Diagram);

export default DiagramContainer;
