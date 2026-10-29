export function lateFee(daysLate: number): number { return daysLate * 0.5; }

const MAX_BOOKS = 3;

export function canBorrow(borrowedCount: number): boolean {
  return borrowedCount < MAX_BOOKS;
}
