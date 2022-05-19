import { compose, nth, prop, find, equals, curry } from 'ramda';
import parseCode from './parseCode';
import getDistance from './getDistance';
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
  const x = getDistance(fFn, tFn, File);
  const y = getDistance(Number(fRn), Number(tRn), Rank);

  return {
    code: nth(0, to),
    from: {
      x,
      y,
    },
  };
}

export default curry(getAnimationAxis);
