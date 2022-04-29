import parseCode from './parseCode';
import { Side } from '../chess';

export default function detectTurn(turn, code) {
  const { side } = parseCode(code);

  return Side[turn] === Side[side];
}
