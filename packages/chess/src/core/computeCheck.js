import { curry, compose, nth } from 'ramda';
import detectAtackerRoutes from './detectAtackerRoutes';
import findAttacker from './findAttacker';
import getDefenders from './getDefenders';
import { getOppntCodeList, parseCode } from '../utils';
import { King } from '../presets';

function computeCheck(code, timeline) {
  const [snapshot] = timeline;
  const kingCode = compose(nth(0), getOppntCodeList(King, code))(snapshot);
  const atkerCode = findAttacker(kingCode, timeline);
  let atkerRoutes = [];
  let defenders = [];
  let defenderTiles = [];

  // check
  if (atkerCode) {
    const { side, tileName } = parseCode(kingCode);
    const { piece } = parseCode(atkerCode);
    const pretendKing = `${side}${piece}${tileName}`;

    atkerRoutes = detectAtackerRoutes(atkerCode, pretendKing, timeline);
    const defendersGrp = getDefenders(atkerCode, atkerRoutes, timeline);
    defenders = defendersGrp.defenders;
    defenderTiles = defendersGrp.tiles;
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
