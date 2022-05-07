import { curry, intersection, append, indexOf } from 'ramda';
import computeFinalMT from './computeFinalMT';
import { parseCode } from '../utils';
import { File, Rank } from '../presets';

// TODO possible bug when attack by queen
function detectAtackerRoutes(atkerCode, defenderCode, timeline) {
  const { fileName: aFn, rankName: aRn, tileName } = parseCode(atkerCode);
  const { fileName: dFn, rankName: dRn } = parseCode(defenderCode);
  const aMt = computeFinalMT(atkerCode, timeline);
  const bMt = computeFinalMT(defenderCode, timeline);
  const fileDif = Math.abs(indexOf(aFn, File) - indexOf(dFn, File));
  const rankDif = Math.abs(
    indexOf(Number(aRn), Rank) - indexOf(Number(dRn), Rank)
  );
  const isDClose = fileDif === 1 && rankDif === 1;
  const isVClose = fileDif === 1 && rankDif === 0;
  const isHClose = fileDif === 0 && rankDif === 1;
  let routes = append(tileName, intersection(aMt, bMt));

  if (isVClose || isHClose || isDClose) {
    routes = [tileName];
  }

  return routes;
}

export default curry(detectAtackerRoutes);
