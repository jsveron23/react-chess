import { compose, head, find, curry } from 'ramda';
import parseCode from './parseCode';
import subInBetweenIndexes from './subInBetweenIndexes';
import { File, Rank } from '../presets';

/**
 * Get axis for animation effect
 * @param  {Array}  from
 * @param  {Array}  to
 * @return {Object}
 */
function getAnimationAxis(from, to) {
  const { side, fileName: tFn, rankName: tRn } = compose(parseCode, head)(to);
  const { fileName: fFn, rankName: fRn } = compose(
    parseCode,
    find(parseCode.eq(['side', side]))
  )(from);

  return {
    targetCode: head(to),
    from: {
      x: subInBetweenIndexes(fFn, tFn, File),
      y: subInBetweenIndexes(Number(fRn), Number(tRn), Rank),
    },
  };
}

export default curry(getAnimationAxis);
