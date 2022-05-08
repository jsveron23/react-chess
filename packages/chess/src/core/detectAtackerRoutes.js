import { curry, intersection, append } from 'ramda';
import computeFinalMT from './computeFinalMT';
import { parseCode, computeDistance } from '../utils';

// TODO possible bug when attack by queen
// verical, horizontal -> Rook | diagonal -> Bishop
function detectAtackerRoutes(atkerCode, defenderCode, timeline) {
  const { tileName } = parseCode(atkerCode);
  const { file, rank } = computeDistance(atkerCode, defenderCode);
  const isDClose = file === 1 && rank === 1;
  const isVClose = file === 1 && rank === 0;
  const isHClose = file === 0 && rank === 1;

  if (isVClose || isHClose || isDClose) {
    return [tileName];
  }

  const aMt = computeFinalMT(atkerCode, timeline);
  const bMt = computeFinalMT(defenderCode, timeline);

  return append(tileName, intersection(aMt, bMt));
}

export default curry(detectAtackerRoutes);
