import test from 'ava';
import transformInto from '../transformInto';

test('Should return function (curry)', (t) => {
  t.is(typeof transformInto(), 'function');
  t.is(typeof transformInto(null), 'function');
});

test('Should return transformed code', (t) => {
  t.deepEqual(transformInto('Q', 'bPd5'), 'bQd5');
});
