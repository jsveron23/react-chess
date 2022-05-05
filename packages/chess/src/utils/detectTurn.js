import { curry } from 'ramda';
import parseCode from './parseCode';
import { Turn } from '../presets';

function detectTurn(turn, code) {
  const { side } = parseCode(code);

  return turn === Turn[side];
}

export default curry(detectTurn);
