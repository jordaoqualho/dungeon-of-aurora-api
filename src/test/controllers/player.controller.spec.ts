export function add(a: number, b: number): number {
  return a + b;
}
// Simple test case
test('Adding 2 + 3 should return 5', () => {
  const result = add(2, 3);
  expect(result).toBe(5);
});

// Additional test cases
test('Adding 0 + 0 should return 0', () => {
  const result = add(0, 0);
  expect(result).toBe(0);
});

test('Adding -5 + 5 should return 0', () => {
  const result = add(-5, 5);
  expect(result).toBe(0);
});

test('Adding 2.5 + 3.5 should return 6', () => {
  const result = add(2.5, 3.5);
  expect(result).toBe(6);
});
