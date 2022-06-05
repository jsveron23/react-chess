import test from 'ava';
import computePossibleMT from '../computePossibleMT';

// prettier-ignore
const timeline = [
  [
    "bRa8", "bNb8", "bBc8", "bQb4", "bKe8", "bBf8", "bNg8", "bRh8",
    "bPa7", "bPb7", "bPc7", "bPd7", "bPe5", "bPf7", "bPg7", "bPh7",
    "wPa2", "wPb2", "wPc2", "wPd4", "wPe2", "wPf2", "wPg2", "wPh2",
    "wRa1", "wNb1", "wBc1", "wQc3", "wKe1", "wBf1", "wNg1", "wRh1"
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
    "wPa2", "wPb2", "wPc2", "wPd4", "wPe2", "wPf2", "wPg2", "wPh2",
    "wRa1", "wNb1", "wBc1", "wQd1", "wKe1", "wBf1", "wNg1", "wRh1"
  ],
  [
    "bRa8", "bNb8", "bBc8", "bQd8", "bKe8", "bBf8", "bNg8", "bRh8",
    "bPa7", "bPb7", "bPc7", "bPd7", "bPe5", "bPf7", "bPg7", "bPh7",
    "wPa2", "wPb2", "wPc2", "wPd4", "wPe2", "wPf2", "wPg2", "wPh2",
    "wRa1", "wNb1", "wBc1", "wQd1", "wKe1", "wBf1", "wNg1", "wRh1"
  ],
  [
    "bRa8", "bNb8", "bBc8", "bQd8", "bKe8", "bBf8", "bNg8", "bRh8",
    "bPa7", "bPb7", "bPc7", "bPd7", "bPe5", "bPf7", "bPg7", "bPh7",
    "wPa2", "wPb2", "wPc2", "wPd4", "wPe2", "wPf2", "wPg2", "wPh2",
    "wRa1", "wNb1", "wBc1", "wQd2", "wKe1", "wBf1", "wNg1", "wRh1"
  ],
  [
    "bRa8", "bNb8", "bBc8", "bQe7", "bKe8", "bBf8", "bNg8", "bRh8",
    "bPa7", "bPb7", "bPc7", "bPd7", "bPe5", "bPf7", "bPg7", "bPh7",
    "wPa2", "wPb2", "wPc2", "wPd4", "wPe2", "wPf2", "wPg2", "wPh2",
    "wRa1", "wNb1", "wBc1", "wQd2", "wKe1", "wBf1", "wNg1", "wRh1"
  ],
  [
    "bRa8", "bNb8", "bBc8", "bQe7", "bKe8", "bBf8", "bNg8", "bRh8",
    "bPa7", "bPb7", "bPc7", "bPd7", "bPe5", "bPf7", "bPg7", "bPh7",
    "wPa2", "wPb2", "wPc2", "wPd4", "wPe2", "wPf2", "wPg2", "wPh2",
    "wRa1", "wNb1", "wBc1", "wQc3", "wKe1", "wBf1", "wNg1", "wRh1"
  ]
]

test('Should be returned movable tiles', (t) => {
  t.deepEqual(computePossibleMT('', [], 'wQc3', timeline), ['d2', 'b4']);
});
