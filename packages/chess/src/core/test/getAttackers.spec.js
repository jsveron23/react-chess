import test from 'ava';
import getAttackers from '../getAttackers';

// prettier-ignore
const timeline = [
  [
    "bRa8", "bNb8", "bBc8", "bQd8", "bKe8", "bBf8", "bNg8", "bRh8",
    "bPa7", "bPb7", "bPc7", "bPd5", "bPe7", "bPf7", "bPg7", "bPh7",
    "wPa2", "wPb2", "wPc4", "wPd2", "wPe2", "wPf2", "wPg2", "wPh2",
    "wRa1", "wNb1", "wBc1", "wQa4", "wKe1", "wBf1", "wNg1", "wRh1"
  ],
  [
    "bRa8", "bNb8", "bBc8", "bQd8", "bKe8", "bBf8", "bNg8", "bRh8",
    "bPa7", "bPb7", "bPc7", "bPd7", "bPe7", "bPf7", "bPg7", "bPh7",
    "wPa2", "wPb2", "wPc2", "wPd2", "wPe2", "wPf2", "wPg2", "wPh2",
    "wRa1", "wNb1", "wBc1", "wQd1", "wKe1", "wBf1", "wNg1", "wRh1"
  ],
  [
    "bRa8", "bNb8", "bBc8", "bQd8", "bKe8", "bBf8", "bNg8", "bRh8",
    "bPa7", "bPb7", "bPc7", "bPd7", "bPe7", "bPf7", "bPg7", "bPh7",
    "wPa2", "wPb2", "wPc4", "wPd2", "wPe2", "wPf2", "wPg2", "wPh2",
    "wRa1", "wNb1", "wBc1", "wQd1", "wKe1", "wBf1", "wNg1", "wRh1"
  ]
]

test('Should be returned function', (t) => {
  t.is(typeof getAttackers(), 'function');
  t.is(typeof getAttackers([]), 'function');
});

test('Should be returned attackers', (t) => {
  t.deepEqual(getAttackers('bKe8', timeline), ['wQa4']);
});
