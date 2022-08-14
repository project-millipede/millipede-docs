import { HooksUtils } from '@app/render-utils';
import { motion, Variants } from 'framer-motion';
import { CSSProperties, FC, ReactNode, useMemo } from 'react';
import styled from 'styled-components';

import { HeightVariants, THeightVariants } from '../types';

const Container = styled(motion.div)`
  overflow: hidden;
`;

export const dynamicHeightVariants: Variants = {
  open: (height: number) => {
    return {
      opacity: 1,
      height: height
    };
  },
  collapsed: { opacity: 0, height: 0 }
};

export const autoHeightVariants: Variants = {
  open: {
    opacity: 1,
    height: 'auto'
  },
  collapsed: { opacity: 0, height: 0 }
};

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

interface AnimateHeightProps {
  isVisible: boolean;
  duration?: number;
  ease?: string;
  variantsType?: THeightVariants;
  style?: CSSProperties;
}

export const AnimateHeight: FC<
  AnimateHeightProps & {
    children: ReactNode;
  }
> = ({
  isVisible,
  duration,
  ease = 'easeOut',
  variantsType = HeightVariants.Auto,
  style,
  children
}) => {
  const [ref, bounds] = HooksUtils.useResize();

  const calculatedDuration = useMemo(() => {
    const duration = getAutoHeightDuration(bounds.height) / 1000;
    return duration;
  }, [bounds.height]);

  return (
    <Container
      initial='collapsed'
      animate={isVisible ? 'open' : 'collapsed'}
      exit='collapsed'
      variants={
        (variantsType === HeightVariants.Auto && autoHeightVariants) ||
        (variantsType === HeightVariants.Dynamic && dynamicHeightVariants)
      }
      inherit={false}
      transition={{
        ease,
        duration: typeof duration === 'number' ? duration : calculatedDuration
      }}
      custom={bounds.height}
    >
      <div ref={ref} style={style}>
        {children}
      </div>
    </Container>
  );
};
