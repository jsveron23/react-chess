import { curry } from 'ramda';
import parseCode from '../core/parseCode';
import { Side } from '../presets';

function detectTurn(turn, code) {
  const { side } = parseCode(code);

  return Side[turn] === Side[side];
}

export default curry(detectTurn);
