import { AnimatePresence, useSpring } from 'framer-motion';
import React, { forwardRef, ForwardRefRenderFunction, ReactNode, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';

import { SheetContext } from '../context/SheetContext';
import { SheetHandleProps } from '../types';

interface SheetWrapperProps {
  bottom: number;
  width: number;
}

const SheetWrapper = styled.div<SheetWrapperProps>`
  position: absolute;
  top: 0;
  bottom: ${({ bottom }) => `${bottom}px`};
  width: ${({ width }) => `${width}px`};
  overflow: hidden;
  z-index: 4;
`;

type SheetProps = {
  isOpen: boolean;
  onClose: () => void;
  snapPoints: Array<number>;
  initialSnapPointIndex: number;
  size: Partial<DOMRect>;
  bottomSize: Partial<DOMRect>;
  children: ReactNode;
};

const Sheet: ForwardRefRenderFunction<SheetHandleProps, SheetProps> = (
  {
    children,
    isOpen,
    onClose,
    snapPoints,
    initialSnapPointIndex,
    size,
    bottomSize
  },
  forwardedRef
) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  const sheetSpringY = useSpring(size.height, {
    stiffness: 100,
    damping: 10,
    mass: 0.01
  });

  useImperativeHandle(forwardedRef, () => ({
    snapTo: (snapIndex: number) => {
      if (snapPoints && snapPoints[snapIndex] !== undefined) {
        const sheetEl = sheetRef.current;
        // const sheetElHeight = sheetEl.getBoundingClientRect().height;
        const sheetElHeight = sheetEl.parentElement.getBoundingClientRect()
          .height;
        const snapTo = sheetElHeight - snapPoints[snapIndex];
        if (snapTo < 0) {
          sheetSpringY.set(0);
        } else {
          sheetSpringY.set(snapTo);
        }
      }
    },
    snapToPx: (height: number, offsetTop: number) => {
      const sheetEl = sheetRef.current;
      // const sheetElHeight = sheetEl.getBoundingClientRect().height;
      const sheetElHeight = sheetEl.parentElement.getBoundingClientRect()
        .height;

      const snapTo = size.height - (bottomSize.height + height + offsetTop);

      sheetSpringY.set(snapTo);

      if (snapTo >= sheetElHeight || snapTo < 0) {
        onClose();
      }
    }
  }));

  const context = {
    sheetRef,
    isOpen,
    snapPoints,
    initialSnapPointIndex,
    y: sheetSpringY
  };

  return (
    <SheetContext.Provider value={context}>
      <SheetWrapper width={size.width} bottom={bottomSize.height}>
        {/* <AnimatePresence>
          {isOpen && RenderUtils.hasChildren(children)
            ? Children.map(children, (child, index) => {
                cloneElement(child, { key: `sheet-child-${index}` });
              })
            : null}
        </AnimatePresence> */}
        <AnimatePresence>{isOpen ? children : null}</AnimatePresence>
      </SheetWrapper>
    </SheetContext.Provider>
  );
};

export default forwardRef(Sheet);
