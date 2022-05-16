import test from 'ava';
import getEqualPieces from '../getEqualPieces';

// prettier-ignore
const Snapshot = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
];

test('Should throw TypeError', (t) => {
  t.throws(() => getEqualPieces('K', []), {
    instanceOf: TypeError,
  });
});

test('Should return function (curry)', (t) => {
  t.is(typeof getEqualPieces(), 'function');
  t.is(typeof getEqualPieces(null), 'function');
});

test('Should return match code list', (t) => {
  t.deepEqual(getEqualPieces('P', Snapshot), [
    'bPa7',
    'bPb7',
    'bPc7',
    'bPd7',
    'bPe7',
    'bPf7',
    'bPg7',
    'bPh7',
    'wPa2',
    'wPb2',
    'wPc2',
    'wPd2',
    'wPe2',
    'wPf2',
    'wPg2',
    'wPh2',
  ]);
  t.deepEqual(getEqualPieces('Q', Snapshot), ['bQd8', 'wQd1']);
});
