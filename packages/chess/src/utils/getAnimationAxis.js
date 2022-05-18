import { compose, nth, prop, find, equals, indexOf, curry } from 'ramda';
import parseCode from './parseCode';
import { File, Rank } from '../presets';

function getAnimationAxis(from, to) {
  console.log(from, to);
  const { side, fileName: tFn, rankName: tRn } = compose(parseCode, nth(0))(to);
  const { fileName: fFn, rankName: fRn } = compose(
    parseCode,
    find(compose(equals(side), prop('side'), parseCode))
  )(from);
  const x = indexOf(fFn, File) - indexOf(tFn, File);
  const y = indexOf(Number(fRn), Rank) - indexOf(Number(tRn), Rank);
  const axis = {
    code: to[0],
    from: {
      x: 0,
      y: 0,
    },
  };

  axis.from = {
    x,
    y,
  };

  return axis;
}

export default curry(getAnimationAxis);
