import { curry, reject, startsWith, includes } from 'ramda';
import parseCode from './parseCode';
import { Opponent, Pawn } from '../presets';

function detectEnemy(movableTiles, selectedCode, pretendCode, tileName) {
  const {
    piece: sPiece = '',
    side: sSide,
    fileName: sFilename,
  } = parseCode(selectedCode);

  // pawn naver have enemy on vertical tile
  const isPawn = sPiece === Pawn;
  const filteredMt = isPawn
    ? reject(startsWith(sFilename), movableTiles)
    : movableTiles;

  const { side: rSide } = parseCode(pretendCode);
  const isEnemy = sSide === Opponent[rSide];
  const isOTW = includes(tileName, filteredMt);

  return isOTW && isEnemy;
}

export default curry(detectEnemy);
