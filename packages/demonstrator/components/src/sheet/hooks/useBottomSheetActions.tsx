import { MutableRefObject, useCallback } from 'react';

import { SheetHandleProps } from '../types';

export const useBottomSheetActions = (
  sheetRef: MutableRefObject<SheetHandleProps>
) => {
  const snapTo = useCallback(
    (index: number) => {
      try {
        sheetRef.current?.snapTo(index);
      } catch (e) {
        if (e instanceof TypeError) {
          // If the bottomsheet isn't visible this may throw an error
          // ignore
          return;
        }
        throw e;
      }
    },
    [sheetRef]
  );
  const snapToPx = useCallback(
    (height: number, offsetTop: number) => {
      try {
        sheetRef.current?.snapToPx(height, offsetTop);
      } catch (e) {
        if (e instanceof TypeError) {
          // If the bottomsheet isn't visible this may throw an error
          // ignore
          return;
        }
        throw e;
      }
    },
    [sheetRef]
  );
  return {
    snapTo,
    snapToPx
  };
};
