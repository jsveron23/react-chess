import test from 'ava';
import getAnimationAxis from '../getAnimationAxis';

test('Should return function (curry)', (t) => {
  t.is(typeof getAnimationAxis(), 'function');
  t.is(typeof getAnimationAxis([]), 'function');
});

test('Should return axis object for animation', (t) => {
  t.deepEqual(getAnimationAxis(['bNd7', 'wQd5'], ['wQd7']), {
    code: 'wQd7',
    from: {
      x: 0,
      y: 2,
    },
  });
});
