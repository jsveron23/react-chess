import { compose, head, find, flip, curry } from 'ramda';
import parseCode from './parseCode';
import subInBetweenIndexes from './subInBetweenIndexes';
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
  const _subIdx = isFlipped ? flip(subInBetweenIndexes) : subInBetweenIndexes;

  return {
    targetCode: head(to),
    from: {
      x: subInBetweenIndexes(fFn, tFn, File),
      y: _subIdx(Number(fRn), Number(tRn), Rank),
    },
  };
}

export default curry(getAnimationAxis);
