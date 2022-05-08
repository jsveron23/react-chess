import { curry, compose, nth } from 'ramda';
import detectAtackerRoutes from './detectAtackerRoutes';
import findAttacker from './findAttacker';
import getDefenders from './getDefenders';
import { getOppntCodeList, pretendAs } from '../utils';
import { King } from '../presets';

/**
 * Compute whether Check or not
 * @param  {String} code
 * @param  {Array}  timeline
 * @return {Object}
 */
function computeCheck(code, timeline) {
  const [snapshot] = timeline;
  const kingCode = compose(nth(0), getOppntCodeList(King, code))(snapshot);
  const atkerCode = findAttacker(kingCode, timeline);
  let atkerRoutes = [];
  let defenders = [];
  let defenderTiles = [];

  // check
  if (atkerCode) {
    // match same movement of piece but same tile as King
    const pretendKing = pretendAs(kingCode, atkerCode);
    atkerRoutes = detectAtackerRoutes(atkerCode, pretendKing, timeline);

    // TODO defender of Pawn should not be counted
    const o = getDefenders(atkerCode, timeline, atkerRoutes);
    defenders = o.defenders;
    defenderTiles = o.tiles;
  }

  return {
    kingCode,
    atkerCode,
    atkerRoutes,
    defenderTiles,
    defenders,
  };
}

export default curry(computeCheck);
