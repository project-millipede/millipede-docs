import { MotionValue } from 'framer-motion';
import { createContext, MutableRefObject, useContext } from 'react';

export type SheetContextProps = {
  sheetRef: MutableRefObject<HTMLDivElement>;
  snapPoints: Array<number>;
  initialSnapPointIndex: number;
  fromY: MotionValue<number>;
};

export const SheetContext = createContext<SheetContextProps>(null);

export const useSheetContext = () => {
  const context = useContext(SheetContext);
  if (!context) throw Error('Sheet context error');
  return context;
};
