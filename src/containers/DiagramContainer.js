import { connect } from 'react-redux';
import { compose, prop, defaultTo } from 'ramda';
import { parseCode, findCode, detectDarkTile } from 'chess/es';
import { Diagram } from '~/components';

function mapStateToProps({ ingame: { snapshot } }) {
  const props = {
    snapshot,

    getTileBg(tile, fileName, rankName) {
      const isDark = detectDarkTile({ rankName, fileName });

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

const DiagramContainer = connect(mapStateToProps)(Diagram);

export default DiagramContainer;
