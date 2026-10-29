import { lateFee } from './library';

describe('lateFee', () => {
  test('lateFee(4) returns 2', () => {
    expect(lateFee(4)).toBe(2);
  });
});
