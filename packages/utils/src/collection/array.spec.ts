import { withoutBorders } from './array';

test('should create interval - from left to right', () => {
  const A: Array<string> = ['A'];
  const AB: Array<string> = ['A', 'B'];
  const ABC: Array<string> = ['A', 'B', 'C'];
  const ABCD: Array<string> = ['A', 'B', 'C', 'D'];

  const resultA = withoutBorders<string>(A, ABCD.length, true);
  expect(resultA).toEqual([]);

  const resultAB = withoutBorders<string>(AB, ABCD.length, true);
  expect(resultAB).toEqual(['B']);

  const resultABC = withoutBorders<string>(ABC, ABCD.length, true);
  expect(resultABC).toEqual(['B', 'C']);

  const resultABCD = withoutBorders<string>(ABCD, ABCD.length, true);
  expect(resultABCD).toEqual(['B', 'C']);
});

test('should create interval - from right to left', () => {
  const A: Array<string> = ['A'];
  const BA: Array<string> = ['B', 'A'];
  const CBA: Array<string> = ['C', 'B', 'A'];
  const DCBA: Array<string> = ['D', 'C', 'B', 'A'];

  const resultA = withoutBorders<string>(A, DCBA.length, false);
  expect(resultA).toEqual([]);

  const resultBA = withoutBorders<string>(BA, DCBA.length, false);
  expect(resultBA).toEqual(['B']);

  const resultCBA = withoutBorders<string>(CBA, DCBA.length, false);
  expect(resultCBA).toEqual(['C', 'B']);

  const resultDCBA = withoutBorders<string>(DCBA, DCBA.length, false);
  expect(resultDCBA).toEqual(['C', 'B']);
});
