import { MutableRefObject, useCallback } from 'react';

import { SheetHandleProps } from '../types';

export const useBottomSheetActions = (
  sheetRef: MutableRefObject<SheetHandleProps>
) => {
  const reset = useCallback(() => {
    if (sheetRef && sheetRef.current) {
      sheetRef.current.reset();
    }
  }, [sheetRef]);
  const snapTo = useCallback(
    (index: number) => {
      if (sheetRef && sheetRef.current) {
        sheetRef.current.snapTo(index);
      }
    },
    [sheetRef]
  );
  const snapToPx = useCallback(
    (height: number, offsetTop: number) => {
      if (sheetRef && sheetRef.current) {
        sheetRef.current.snapToPx(height, offsetTop);
      }
    },
    [sheetRef]
  );
  return {
    reset,
    snapTo,
    snapToPx
  };
};
