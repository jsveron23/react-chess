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
    rank: 6,
    file: 0,
  });

  t.deepEqual(computeDistance('wKa2', 'bQa3'), {
    rank: 1,
    file: 0,
  });
});
