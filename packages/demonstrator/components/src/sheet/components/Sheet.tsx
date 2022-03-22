import { animate, AnimatePresence, AnimationOptions, useMotionValue } from 'framer-motion';
import {
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

type SheetProps = {
  isOpen: boolean;
  snapPoints: Array<number>;
  initialSnapPointIndex: number;
  appContainerSize: Partial<DOMRect>;
  bottomContainerSize: Partial<DOMRect>;
  transition?: AnimationOptions<number>;
  children: ReactNode;
};

const defaultTransition: AnimationOptions<number> = {
  type: 'spring',
  duration: 0.2
};

const Sheet: ForwardRefRenderFunction<SheetHandleProps, SheetProps> = (
  {
    isOpen,
    snapPoints,
    initialSnapPointIndex,
    appContainerSize,
    bottomContainerSize,
    transition = defaultTransition,
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
    reset: () => {
      // do nothing.
    },

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
        animate(fromY, 0, transition);
      } else {
        const toY = contentHeight - snapPoint;
        animate(fromY, toY, transition);
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

      animate(fromY, toY, transition);
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
      <SheetWrapper>
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
