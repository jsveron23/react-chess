import { compose, nth, indexOf, curry } from 'ramda';
import parseCode from './parseCode';
import { File, Rank } from '../presets';

function getAnimationAxis(from, to) {
  const { fileName: tFn, rankName: tRn } = compose(parseCode, nth(0))(to);
  const { fileName: fFn, rankName: fRn } = compose(parseCode, nth(0))(from);
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
