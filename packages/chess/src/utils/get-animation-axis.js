import {
  compose,
  head,
  find,
  flip,
  curry,
  T,
  cond,
  always,
  identity,
} from 'ramda';
import { parseCode } from './parse-code';
import { subInBetweenIndexes } from './sub-in-between-indexes';
import { File, Rank } from '../presets';

/**
 * Get axis for animation effect
 * @param  {Boolean} isFlipped
 * @param  {Array}   from
 * @param  {Array}   to
 * @return {Object}
 */
function getAnimationAxis(isFlipped, from, to) {
  const { side, fileName: tFn, rankName: tRn } = compose(parseCode, head)(to);
  const { fileName: fFn, rankName: fRn } = compose(
    parseCode,
    find(parseCode.eq(['side', side]))
  )(from);
  const _subIdx = cond([
    [always(isFlipped), flip],
    [T, identity],
  ])(subInBetweenIndexes);

  return {
    targetCode: head(to),
    from: {
      x: _subIdx(fFn, tFn, File),
      y: _subIdx(Number(fRn), Number(tRn), Rank),
    },
  };
}

const getAnimationAxisCurried = curry(getAnimationAxis);
export { getAnimationAxisCurried as getAnimationAxis };