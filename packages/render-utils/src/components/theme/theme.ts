import theme from './theme.module.scss';

const xs = Number(theme.xs);
const sm = Number(theme.sm);
const md = Number(theme.md);
const lg = Number(theme.lg);
const xl = Number(theme.xl);

export const breakpoints = [xs, sm, md, lg, xl];

export const themes = {
  xs,
  sm,
  md,
  lg,
  xl
};

export const Breakpoint = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl'
} as const;

export type TBreakPoint = keyof typeof Breakpoint;

export const Boundary = {
  lower: 'lower', // Desktop
  upper: 'upper' // Mobile
} as const;

export type TBoundary = typeof Boundary[keyof typeof Boundary];
