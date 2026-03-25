import { test, expect } from 'bun:test';
import { getAnimationAxis } from '../get-animation-axis';

test('Should return function (curry)', () => {
  expect(typeof getAnimationAxis()).toBe('function');
  expect(typeof getAnimationAxis([])).toBe('function');
});

test('Should return axis object for animation', () => {
  expect(getAnimationAxis(false, ['bNd7', 'wQd5'], ['wQd7'])).toEqual({
    targetCode: 'wQd7',
    from: {
      x: 0,
      y: 2,
    },
  });

  expect(getAnimationAxis(true, ['bNd7', 'wQd5'], ['wQd7'])).toEqual({
    targetCode: 'wQd7',
    from: {
      x: 0,
      y: -2,
    },
  });
});
