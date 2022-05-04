import { compose, curry, reject, startsWith, includes, clone } from 'ramda';
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
  const isOppnentSide = sSide === Opponent[rSide];
  const isPieceTile = validateCode(pretendCode);
  const isPawn = sPiece === Pawn;
  let isInMt = includes(tileName, movableTiles);

  // pawn don't need vertical enemy
  if (isPawn) {
    isInMt = compose(
      includes(tileName),
      reject(startsWith(sFilename)),
      clone
    )(movableTiles);
  }

  return isPieceTile && isInMt && isOppnentSide;
}

export default curry(detectEnemy);
