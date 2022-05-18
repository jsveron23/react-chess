import { compose, nth, prop, find, equals, indexOf, curry } from 'ramda';
import parseCode from './parseCode';
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
  const x = indexOf(fFn, File) - indexOf(tFn, File);
  const y = indexOf(Number(fRn), Rank) - indexOf(Number(tRn), Rank);

  return {
    code: nth(0, to),
    from: {
      x,
      y,
    },
  };
}

export default curry(getAnimationAxis);
