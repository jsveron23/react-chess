import test from 'ava';
import parseCode from '../parseCode';

test('parseCode - invalid code', (t) => {
  t.deepEqual(parseCode(), {});
  t.deepEqual(parseCode('Pa2'), {});
});

test('parseCode - valid code', (t) => {
  t.deepEqual(parseCode('wPa2'), {
    pKey: 'wP',
    tileName: 'a2',
    side: 'w',
    piece: 'P',
    fileName: 'a',
    rankName: '2',
  });
});
