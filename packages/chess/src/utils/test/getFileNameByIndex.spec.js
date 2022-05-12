import test from 'ava';
import getFileNameByIndex from '../getFileNameByIndex';

test('getFileNameByIndex - invalid code', (t) => {
  t.is(typeof getFileNameByIndex(), 'function');
  t.is(typeof getFileNameByIndex('a'), 'function');
});

test('getFileNameByIndex - valid code', (t) => {
  t.deepEqual(getFileNameByIndex('a', 1), 'b');
});
