import test from 'ava';
import parseCode from '../parseCode';

test('parseCode', (t) => {
  t.deepEqual(parseCode(), {});
  t.deepEqual(parseCode('Pa2'), {});
  t.deepEqual(parseCode('wPa2'), {
    pKey: 'wP',
    tileName: 'a2',
    code: 'wPa2',
    side: 'w',
    piece: 'P',
    fileName: 'a',
    rankName: '2',
  });
});
