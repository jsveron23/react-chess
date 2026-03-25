import { test, expect } from 'bun:test';
import { devideSourceCapture } from '../internal/devide-source-capture';

test('Should assign to source when code side matches', () => {
  const result = devideSourceCapture('w', {}, 'wPe2');
  expect(result).toHaveProperty('source');
  expect(result.source.tileName).toBe('e2');
  expect(result.source.side).toBe('w');
});

test('Should assign to capture when code side does not match', () => {
  const result = devideSourceCapture('w', {}, 'bPe5');
  expect(result).toHaveProperty('capture');
  expect(result.capture.tileName).toBe('e5');
  expect(result.capture.side).toBe('b');
});

test('Should accumulate source and capture via reduce', () => {
  const result = ['wPe2', 'bPe5'].reduce(devideSourceCapture('w'), {});
  expect(result.source.tileName).toBe('e2');
  expect(result.capture.tileName).toBe('e5');
});
