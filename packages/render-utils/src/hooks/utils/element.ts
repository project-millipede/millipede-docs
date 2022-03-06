export type HTMLOrSVGElement = HTMLElement | SVGElement;

export const findScrollContainers = (
  element: HTMLOrSVGElement | null
): Array<HTMLOrSVGElement> => {
  const result: Array<HTMLOrSVGElement> = [];
  if (!element || element === document.body) return result;
  const { overflow, overflowX, overflowY } = window.getComputedStyle(element);
  if (
    [overflow, overflowX, overflowY].some(
      prop => prop === 'auto' || prop === 'scroll'
    )
  ) {
    result.push(element);
  }
  return [...result, ...findScrollContainers(element.parentElement)];
};

export const Overflow = {
  x: 'x',
  y: 'y',
  all: 'all'
} as const;

export type TOverflow = typeof Overflow[keyof typeof Overflow];

export const findScrollContainersWithOverflow = (
  element: HTMLOrSVGElement | null,
  overflow: TOverflow
): Array<HTMLOrSVGElement> => {
  const result: Array<HTMLOrSVGElement> = [];
  if (!element || element === document.body) return result;
  const {
    overflow: overflowValue,
    overflowX,
    overflowY
  } = window.getComputedStyle(element);
  if (
    (overflow === Overflow.x && overflowX === 'auto') ||
    overflowX === 'scroll'
  )
    result.push(element);
  if (
    (overflow === Overflow.y && overflowY === 'auto') ||
    overflowY === 'scroll'
  )
    result.push(element);
  if (
    (overflow === Overflow.all && overflowValue === 'auto') ||
    overflowValue === 'scroll'
  )
    result.push(element);
  return [...result, ...findScrollContainers(element.parentElement)];
};

// Checks if element boundaries are equal
export const defaultKeys: Array<keyof DOMRectReadOnly> = [
  'x',
  'y',
  'top',
  'bottom',
  'left',
  'right',
  'width',
  'height'
];

export const areBoundsEqual = (
  keys: Array<keyof DOMRectReadOnly>,
  a: Partial<DOMRectReadOnly>,
  b: Partial<DOMRectReadOnly>
): boolean => keys.every(key => a[key] === b[key]);
