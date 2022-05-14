import test from 'ava';
import replaceCode from '../replaceCode';

// prettier-ignore
const Snapshot = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
];

test('replaceCode', (t) => {
  t.deepEqual(replaceCode([], 'bPd7', 'Pd5'), []);
  t.deepEqual(replaceCode(null, null, null), []);
  t.deepEqual(replaceCode([], null, null), []);
  t.deepEqual(replaceCode([], 'Pd7', 'bPd5'), []);
  t.deepEqual(replaceCode([], 'bPd7', 'Pd5'), []);
  // prettier-ignore
  t.deepEqual(replaceCode(Snapshot, 'bPd7', 'bPd5'), [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
  ]);
});
