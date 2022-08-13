import { debounce as createDebounce } from 'lodash-es';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useCallbackRef } from './use-callback-ref';
import { areBoundsEqual, HTMLOrSVGElement } from './utils/element';

const useOnWindowResize = (onWindowResize: (_e: Event) => void) => {
  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => void window.removeEventListener('resize', onWindowResize);
  }, [onWindowResize]);
};

export const boundKeys: Array<keyof DOMRectReadOnly> = [
  'top',
  'height',
  'left',
  'width',
  'x',
  'y'
];

export type State = {
  element?: HTMLOrSVGElement | null;
  lastBounds: Partial<DOMRectReadOnly>;
  resizeObserver: ResizeObserver | null;
};

export type Options = {
  debounce?: number;
  callBack?: (node: HTMLElement) => void;
};

export const useResize = ({
  debounce = 60,
  callBack
}: Options): [(node: HTMLElement) => void, Partial<DOMRectReadOnly>] => {
  const [bounds, setBounds] = useState<Partial<DOMRectReadOnly>>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0
  });

  const state = useRef<State>({
    element: null,
    resizeObserver: null,
    lastBounds: bounds
  });

  const [setRef] = useCallbackRef<HTMLElement>(
    (node: HTMLElement) => {
      const {
        current: { element }
      } = state;

      if (node != null && node !== element) {
        state.current.element = node;

        const size = state.current.element.getBoundingClientRect();
        state.current.lastBounds = size;
        setBounds(() => size);

        state.current.resizeObserver = new ResizeObserver(resizeChange as any);
        state.current.resizeObserver!.observe(state.current.element);

        if (callBack != null) {
          callBack(state.current.element);
        }
      }
    },
    (_node: HTMLElement) => {
      if (state.current.resizeObserver) {
        state.current.resizeObserver.disconnect();
        state.current.resizeObserver = null;
      }
    }
  );

  const [resizeChange] = useMemo(() => {
    const callback = (_e: Event): void => {
      const {
        current: { element, lastBounds }
      } = state;

      const size = element.getBoundingClientRect();

      if (!areBoundsEqual(boundKeys, lastBounds, size)) {
        state.current.lastBounds = size;
        setBounds(() => size);
      }
    };
    return [debounce > 0 ? createDebounce(callback, debounce) : callback];
  }, [setBounds, debounce]);

  useOnWindowResize(resizeChange);

  return [setRef, bounds];
};
