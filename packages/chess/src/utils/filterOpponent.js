import { curry, filter } from 'ramda';
import detectOpponent from './detectOpponent';

function filterOpponent(code, snapshot) {
  return filter(detectOpponent(code), snapshot);
}

export default curry(filterOpponent);
