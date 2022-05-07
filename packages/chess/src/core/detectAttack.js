import {
  curry,
  compose,
  map,
  filter,
  flip,
  flatten,
  uniq,
  equals,
  complement,
  isNil,
  find,
} from 'ramda';
import computeFinalMT from './computeFinalMT';
import { detectOpponent, parseCode } from '../utils';

const isExist = complement(isNil);

// TODO pending
function detectAttack(code, timeline) {
  const { tileName } = parseCode(code);
  const [snapshot] = timeline;

  return compose(
    isExist,
    find(equals(tileName)),
    uniq,
    flatten,
    map(flip(computeFinalMT)(timeline)),
    filter(detectOpponent(code))
  )(snapshot);
}

export default curry(detectAttack);
