import { MotionValue } from 'framer-motion';
import { createContext, useContext, MutableRefObject } from 'react';

export type SheetContextProps = {
  sheetRef: MutableRefObject<HTMLDivElement>;
  isOpen: boolean;
  snapPoints: Array<number>;
  initialSnapPointIndex: number;
  y: MotionValue<number>;
};

export const SheetContext = createContext<SheetContextProps>(null);

export const useSheetContext = () => {
  const context = useContext(SheetContext);
  if (!context) throw Error('Sheet context error');
  return context;
};
