import { motion } from 'framer-motion';
import React, { FC } from 'react';

import { useSheetContext } from '../context/SheetContext';

interface SheetContainerProps {
  appContainerSize: Partial<DOMRect>;
  bottomContainerSize: Partial<DOMRect>;
}

export const SheetContainer: FC<SheetContainerProps> = ({
  appContainerSize,
  bottomContainerSize,
  children
}) => {
  const {
    snapPoints,
    initialSnapPointIndex = 0,
    sheetRef,
    fromY
  } = useSheetContext();

  const [maxSnapPoint] = snapPoints ? snapPoints : [0];

  const initialSnapPoint =
    snapPoints && snapPoints.length >= initialSnapPointIndex
      ? snapPoints[initialSnapPointIndex]
      : 0;

  const sheetHeight = maxSnapPoint
    ? Math.min(maxSnapPoint, appContainerSize.height)
    : appContainerSize.height;

  const initialY =
    appContainerSize.height - bottomContainerSize.height - initialSnapPoint;

  return (
    <motion.div
      ref={sheetRef}
      style={{
        height: sheetHeight,
        pointerEvents: 'auto', // Important to access elements inside the bottom sheet container
        backgroundColor: '#FFFFFF',
        y: fromY // seems this is used for snaps, only
      }}
      initial={{ y: appContainerSize.height - bottomContainerSize.height }}
      animate={{ y: initialY }}
      exit={{ y: appContainerSize.height - bottomContainerSize.height }}
    >
      {children}
    </motion.div>
  );
};
