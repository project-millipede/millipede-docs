import { animate, AnimatePresence, AnimationOptions, useMotionValue } from 'framer-motion';
import React, {
  Children,
  cloneElement,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import styled from 'styled-components';

import { SheetContext } from '../context/SheetContext';
import { SheetHandleProps } from '../types';

const SheetWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  pointer-events: none; // Important to access elements outside / behind the bottom sheet container
  z-index: 5;
`;

type SheetProps = {
  isOpen: boolean;
  snapPoints: Array<number>;
  initialSnapPointIndex: number;
  appContainerSize: Partial<DOMRect>;
  bottomContainerSize: Partial<DOMRect>;
  springConfig?: AnimationOptions<number>;
  children: ReactNode;
  onClose?: () => void;
};

export const inDescendingOrder = (arr: Array<number>) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 1] > arr[i]) return false;
  }
  return true;
};

const Sheet: ForwardRefRenderFunction<SheetHandleProps, SheetProps> = (
  {
    isOpen,
    snapPoints,
    initialSnapPointIndex,
    appContainerSize,
    bottomContainerSize,
    springConfig = {
      type: 'spring',
      duration: 0.2
    },
    children
  },
  ref
) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  const fromY = useMotionValue(appContainerSize.height);

  const snapPointsAbsolute = useMemo(() => {
    if (snapPoints) {
      // convert negative / percentage snap points to absolute values
      return snapPoints.map(snapPoint => {
        // percentage values e.g. between 0.0 and 1.0
        if (snapPoint > 0 && snapPoint <= 1)
          return snapPoint * appContainerSize.height;
        // negative values
        return snapPoint < 0 ? appContainerSize.height + snapPoint : snapPoint;
      });
    }
  }, [snapPoints]);

  useImperativeHandle(ref, () => ({
    reset: () => {},

    // +-----+-----+-----+-----+
    // |  a  |  -  |  -  |  >  |
    // +-----+-----+-----+-----+
    // |  |  |     |     |     |
    // +-----+-----+-----+-----+
    // |  |  |  c  |  c  |  c  | - element c, absolute positioned (sheet component)
    // +-----+-----+-----+-----+
    // |  v  |  b  |  b  |  b  | - element b, positioned relative to a
    // +-----+-----+-----+-----+

    // toY = a.height - b.height - snapPoint[selectedSnapPoint] -

    // snapPoint[selectedSnapPoint] is like a relative element to a, positioned on top of element b,
    // with its top coordinate set to
    // c-(top) = a-(height) - b(height) - c(height)

    snapTo: (snapIndex: number) => {
      const snapPoint =
        (snapPointsAbsolute &&
          snapPointsAbsolute.length >= snapIndex &&
          snapPointsAbsolute[snapIndex]) ||
        0;

      // variant 1
      const contentHeight =
        appContainerSize.height - bottomContainerSize.height;

      // variant 2
      // const sheetEl = sheetRef.current;
      // const contentHeight =
      //   sheetEl.parentElement.getBoundingClientRect().height;

      if (snapPoint > contentHeight) {
        animate(fromY, 0, springConfig);
      } else {
        const toY = contentHeight - snapPoint;
        animate(fromY, toY, springConfig);
      }
    },

    snapToPx: (height: number, offsetTop: number) => {
      // variant 1
      // const toY =
      //   appContainerSize.height -
      //   bottomContainerSize.height -
      //   (height + offsetTop);

      // variant 2
      const sheetEl = sheetRef.current;
      const toY =
        sheetEl.parentElement.getBoundingClientRect().height -
        (height + offsetTop);

      animate(fromY, toY, springConfig);
    }
  }));

  return (
    <SheetContext.Provider
      value={{
        sheetRef,
        snapPoints: snapPointsAbsolute,
        initialSnapPointIndex,
        fromY: fromY
      }}
    >
      <SheetWrapper
        style={{
          width: appContainerSize.width
        }}
      >
        {/* Note: AnimatePresence requires us to set keys to children */}
        <AnimatePresence>
          {isOpen
            ? Children.map(children, (child: any, i) =>
                cloneElement(child, { key: `sheet-child-${i}` })
              )
            : null}
        </AnimatePresence>
      </SheetWrapper>
    </SheetContext.Provider>
  );
};

export default forwardRef(Sheet);
