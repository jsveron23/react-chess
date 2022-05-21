import test from 'ava';
import computeDistance from '../computeDistance';

test('Should throw TypeError', (t) => {
  const typeError = {
    instanceOf: TypeError,
  };

  t.throws(() => computeDistance('', ''), typeError);
  t.throws(() => computeDistance('abc', ''), typeError);
  t.throws(() => computeDistance('abc', 'def'), typeError);
  t.throws(() => computeDistance('abc', 'def'), typeError);
});

test('Should return function (curry)', (t) => {
  t.is(typeof computeDistance(''), 'function');
  t.is(typeof computeDistance('abc'), 'function');
});

test('Should return object of distance data', (t) => {
  t.deepEqual(computeDistance('wKa2', 'bQa8'), {
    contact: false,
    direction: 'Vertical',
    rank: 6,
    file: 0,
    isDiagonal: false,
    isHorizontal: false,
    isVertical: true,
  });

  t.deepEqual(computeDistance('wKa2', 'bQa3'), {
    contact: true,
    rank: 1,
    file: 0,
    direction: 'Vertical',
    isDiagonal: false,
    isHorizontal: false,
    isVertical: true,
  });
});
