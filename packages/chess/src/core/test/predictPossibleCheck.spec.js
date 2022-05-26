import test from 'ava';
// import sinon from 'sinon';
import predictPossibleCheck from '../predictPossibleCheck';

// prettier-ignore
const snapshot1 = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
];

// prettier-ignore
const snapshot2 = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc4', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQa4', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
];

test('Should be returned function', (t) => {
  t.is(typeof predictPossibleCheck(), 'function');
  t.is(typeof predictPossibleCheck([]), 'function');
});

test('Should be returned falsy value (no attacker)', (t) => {
  t.falsy(predictPossibleCheck([snapshot1], 'wPb2'));
  t.falsy(predictPossibleCheck([snapshot1], 'wQd1'));
});

test('Should be returned an attacker code', (t) => {
  t.is(predictPossibleCheck([snapshot2], 'bKe8'), 'wQa4');
});

// TODO investigate
// test('Should be called functions with', (t) => {
//   const spy1 = sinon.spy();
//   predictPossibleCheck.__Rewire__('getAttackers', spy1);
//
//   predictPossibleCheck([snapshot2], 'bKe8');
//
//   t.true(spy1.called);
//
//   sinon.restore();
// });
