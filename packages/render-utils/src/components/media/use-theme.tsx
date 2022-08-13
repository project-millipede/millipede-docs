import { useConst } from '../../hooks';
import { breakpoints, styles, themes } from '../theme';

export const Boundary = {
  lower: 'lower', // Desktop
  upper: 'upper' // Mobile
} as const;

export type TBoundary = typeof Boundary[keyof typeof Boundary];

const themeNameMapper = Object.fromEntries(
  Object.entries(themes).map(([themeName, breakpoint]) => [
    breakpoint,
    themeName
  ])
);

export const useTheme = (boundary: TBoundary) => {
  const ssrThemes = useConst(() =>
    Array.from(new Set([...breakpoints])).sort((x, y) => x - y)
  );

  const className = styles[`${themeNameMapper[ssrThemes[2 - 1]]}-${boundary}`];

  return className;
};

// export const useTheme = (breakpoint: TBreakPoint, boundary: TBoundary) => {
//   const className = useConst(() => styles[`${breakpoint}-${boundary}`]);
//   return className;
// };
