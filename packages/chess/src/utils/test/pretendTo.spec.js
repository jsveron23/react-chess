import test from 'ava';
import pretendTo from '../pretendTo';

test('Should return function (curry)', (t) => {
  t.is(typeof pretendTo(), 'function');
  t.is(typeof pretendTo(null), 'function');
});

test('Should return transformed code', (t) => {
  t.deepEqual(pretendTo('bRa8', 'bNb8'), 'bNa8');
});
