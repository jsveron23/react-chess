import test from 'ava';
import replaceCode from '../replaceCode';

// prettier-ignore
const Snapshot = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
];

test('Should return function (curry)', (t) => {
  t.is(typeof replaceCode(), 'function');
  t.is(typeof replaceCode(null), 'function');
  t.is(typeof replaceCode(null, null), 'function');
});

test('Should return empty array if given is not valid', (t) => {
  t.deepEqual(replaceCode([], 'bPd7', 'Pd5'), []);
  t.deepEqual(replaceCode(null, null, null), []);
  t.deepEqual(replaceCode([], null, null), []);
  t.deepEqual(replaceCode([], 'Pd7', 'bPd5'), []);
  t.deepEqual(replaceCode([], 'bPd7', 'Pd5'), []);
});

test('Should return snapshot that replace code inside', (t) => {
  // prettier-ignore
  t.deepEqual(replaceCode(Snapshot, 'bPd7', 'bPd5'), [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
  ]);
});
