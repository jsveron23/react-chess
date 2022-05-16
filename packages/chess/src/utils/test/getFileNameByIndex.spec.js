import test from 'ava';
import getNextFileByIndex from '../getNextFileByIndex';

test('Should return function (curry)', (t) => {
  t.is(typeof getNextFileByIndex(), 'function');
  t.is(typeof getNextFileByIndex(null), 'function');
});

test('Should return next file of given index', (t) => {
  t.deepEqual(getNextFileByIndex('a', 1), 'b');
});
