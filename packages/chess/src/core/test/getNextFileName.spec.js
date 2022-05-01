import test from 'ava';
import getNextFileName from '../getNextFileName';

test('getNextFileName - invalid code', (t) => {
  t.is(typeof getNextFileName(), 'function');
  t.is(typeof getNextFileName('a'), 'function');
});

test('getNextFileName - valid code', (t) => {
  t.deepEqual(getNextFileName('a', 1), 'b');
});
