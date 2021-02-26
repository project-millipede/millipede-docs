import { motion } from 'framer-motion';
import React, { FC } from 'react';

import { useSheetContext } from '../context/SheetContext';

type SheetContainerProps = {
  size: Partial<DOMRect>;
  bottomSize: Partial<DOMRect>;
};

const SheetContainer: FC<SheetContainerProps> = ({
  children,
  size,
  bottomSize
}) => {
  const {
    snapPoints,
    initialSnapPointIndex = 0,
    sheetRef,
    y
  } = useSheetContext();

  const [maxSnapPoint] = snapPoints && snapPoints.length > 0 ? snapPoints : [0];

  const initialSnapPoint =
    snapPoints && snapPoints.length >= initialSnapPointIndex
      ? snapPoints[initialSnapPointIndex]
      : 0;

  const sheetHeight = maxSnapPoint
    ? Math.min(maxSnapPoint, size.height)
    : size.height;

  const initialY = size.height - (bottomSize.height + initialSnapPoint);

  return (
    <motion.div
      ref={sheetRef}
      style={{
        height: sheetHeight,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        zIndex: 2,
        y
      }}
      initial={{ y: size.height }}
      animate={{ y: initialY }}
      exit={{ y: size.height }}
    >
      {children}
    </motion.div>
  );
};

export default SheetContainer;
