import getNextTile from './getNextTile';
import parseCode from './parseCode';
import { Movement } from '../chess';

function computeMovableTiles(code) {
  const { piece } = parseCode(code);

  return Movement[piece].map(getNextTile(code)).filter(Boolean);
}

export default computeMovableTiles;
