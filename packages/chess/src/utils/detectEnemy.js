import { curry, indexOf } from 'ramda';
import parseCode from '../core/parseCode';
import validateCode from './validateCode';
import { Opponent } from '../presets';

function detectEnemy(movableTiles, selectedCode, pretendCode, tileName) {
  const { piece: sPiece = '', side: sSide } = parseCode(selectedCode);
  const { side: rSide } = parseCode(pretendCode);
  const isInMt = indexOf(tileName, movableTiles) > -1;
  const isNotPawn = !sPiece.startsWith('P');
  const isPieceTile = validateCode(pretendCode);
  const isOppnentSide = sSide === Opponent[rSide];

  return isPieceTile && isInMt && isOppnentSide && isNotPawn;
}

export default curry(detectEnemy);
