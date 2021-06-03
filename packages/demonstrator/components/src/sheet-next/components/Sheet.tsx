import { HooksUtils } from '@app/render-utils';
import { AnimationOptions, motion, useAnimation, useMotionValue, Variants } from 'framer-motion';
import React, { FC, ReactNode, useEffect, useMemo } from 'react';
import styled from 'styled-components';

interface SheetProps {
  isOpen: boolean;
  transition?: AnimationOptions<number>;
  header: ReactNode;
  content: ReactNode;
}

export const BottomSheetRoot = styled.div`
  position: absolute;
  overflow: hidden;
`;

export const BottomSheetContainer = styled(motion.div)`
  background: #ffffff;
`;

export const BottomSheetHeader = styled.div`
  background-color: #dddddd;
`;

export const BottomSheetContent = styled.div``;

export const Sheet: FC<SheetProps> = ({
  isOpen,
  transition = {
    type: 'spring'
  },
  header,
  content
}) => {
  const [headerRef, { height: headerHeight = 0 }] = HooksUtils.useResize();
  const [contentRef, { height: contentHeight = 0 }] = HooksUtils.useResize();

  const sheetAnimation = useAnimation();
  const sheetPosition = useMotionValue(0);

  const bottomSheetHeight = headerHeight + contentHeight;

  const variants: Variants = {
    visible: {
      y: 0
    },
    hidden: {
      y: bottomSheetHeight
    }
  };

  useEffect(() => {
    sheetPosition.set(isOpen ? 0 : bottomSheetHeight, true);
  }, [contentHeight]);

  useEffect(() => {
    if (contentHeight > 0) {
      sheetAnimation.start(isOpen ? 'visible' : 'hidden');
    }
  }, [isOpen]);

  const calculatedDuration = useMemo(() => {
    const duration = getAutoHeightDuration(bottomSheetHeight) / 1000;
    return duration;
  }, [bottomSheetHeight]);

  return (
    <BottomSheetRoot style={{ bottom: 0, width: '100%' }}>
      <BottomSheetContainer
        style={{
          y: sheetPosition,
          height: bottomSheetHeight
        }}
        animate={sheetAnimation}
        variants={variants}
        transition={{
          type: 'spring',
          duration:
            typeof transition.duration === 'number'
              ? transition.duration
              : calculatedDuration
        }}
      >
        <BottomSheetHeader ref={headerRef}>{header}</BottomSheetHeader>
        <BottomSheetContent ref={contentRef}>{content}</BottomSheetContent>
      </BottomSheetContainer>
    </BottomSheetRoot>
  );
};

/**
 * Get the duration of the animation depending upon the height provided.
 */
export function getAutoHeightDuration(height: number) {
  if (!height) return 0;
  const constant = height / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
