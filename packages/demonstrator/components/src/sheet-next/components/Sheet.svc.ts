import { AnimationOptions } from 'framer-motion';
import { ReactNode } from 'react';

export interface SheetProps {
  isOpen: boolean;
  header: ReactNode;
  content: ReactNode;
  transition?: AnimationOptions<number>;
  bottomContainerSize?: Partial<DOMRect>;
}

/**
 * Get the duration of the animation depending upon the height provided.
 */
export const getAutoHeightDuration = (height: number) => {
  if (!height) {
    return 0;
  }
  const constant = height / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
};
