import { lateFee, canBorrow } from './library';

describe('lateFee', () => {
  test('lateFee(4) returns 2', () => {
    expect(lateFee(4)).toBe(2);
  });
});

describe('canBorrow', () => {
  test('a member with 3 books cannot borrow', () => {
    expect(canBorrow(3)).toBe(false);
  });

  test('a member with 2 books can borrow', () => {
    expect(canBorrow(2)).toBe(true);
  });
});
