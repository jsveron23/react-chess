import { compose, nth, prop, find, equals, curry } from 'ramda';
import parseCode from './parseCode';
import getSubtraction from './getSubtraction';
import { File, Rank } from '../presets';

/**
 * Get axis for animation effect
 * @param  {Array}  from
 * @param  {Array}  to
 * @return {Object}
 */
function getAnimationAxis(from, to) {
  const { side, fileName: tFn, rankName: tRn } = compose(parseCode, nth(0))(to);
  const { fileName: fFn, rankName: fRn } = compose(
    parseCode,
    find(compose(equals(side), prop('side'), parseCode))
  )(from);

  return {
    code: nth(0, to),
    from: {
      x: getSubtraction(fFn, tFn, File),
      y: getSubtraction(fRn, tRn, Rank),
    },
  };
}

export default curry(getAnimationAxis);
