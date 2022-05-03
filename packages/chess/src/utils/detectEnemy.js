import { curry, indexOf, reject, startsWith, isEmpty } from 'ramda';
import parseCode from '../core/parseCode';
import validateCode from './validateCode';
import { Opponent, Pawn } from '../presets';

// TODO change spec
function detectEnemy(movableTiles, selectedCode, pretendCode, tileName) {
  const {
    piece: sPiece = '',
    side: sSide,
    fileName: sFilename,
  } = parseCode(selectedCode);
  const { side: rSide } = parseCode(pretendCode);
  const isInMt = indexOf(tileName, movableTiles) > -1;
  const isPieceTile = validateCode(pretendCode);
  const isOppnentSide = sSide === Opponent[rSide];
  const isVerticalOnly = isEmpty(reject(startsWith(sFilename), movableTiles));
  const isPawn = sPiece === Pawn;
  const isNotPawnVertical = isPawn && !isVerticalOnly; // possible to attack by diagonal
  const isNotPawnUnless = !isPawn || isNotPawnVertical;

  return isPieceTile && isInMt && isOppnentSide && isNotPawnUnless;
}

export default curry(detectEnemy);
