export const HeightVariants = {
  Auto: 'Auto',
  Dynamic: 'Dynamic'
} as const;

export type THeightVariants =
  typeof HeightVariants[keyof typeof HeightVariants];
