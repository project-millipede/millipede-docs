import { EffectRef, useEffectRef } from '@huse/effect-ref';
import elementResizeDetectorMaker, { Erd } from 'element-resize-detector';
import createDebounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type Options = {
  debounce?: number;
  callBack?: (node: HTMLElement) => void;
};

type State = {
  element: HTMLElement | null;
  scrollContainers: Array<HTMLElement> | null;
  lastBounds: Partial<DOMRect>;
  resizeObserver: Erd;
};

const findScrollContainers = (element: HTMLElement): Array<HTMLElement> => {
  let result: Array<HTMLElement> = [];
  if (element != null) {
    const { overflow, overflowX, overflowY } = window.getComputedStyle(element);
    if (
      [overflow, overflowX, overflowY].some(
        prop => prop === 'auto' || prop === 'scroll'
      )
    ) {
      result = [...result, element];
    }
    return [...result, ...findScrollContainers(element.parentElement)];
  }
  return result;
};

const keys: Array<keyof DOMRect> = ['top', 'height'];

export const areBoundsEqual = (
  a: Partial<DOMRect>,
  b: Partial<DOMRect>
): boolean => keys.every(key => a[key] === b[key]);

export const useMeasure = ({
  debounce = 60,
  callBack
}: Options): [EffectRef<HTMLElement>, Partial<DOMRect>] => {
  const [bounds, setBounds] = useState<Partial<DOMRect>>({
    top: 0,
    height: 0
  });

  const [, setSize] = useState({
    width: 0,
    height: 0
  });

  const state = useRef<State>({
    element: null,
    scrollContainers: null,
    lastBounds: bounds,
    resizeObserver: null
  });

  const [scrollChange, resizeChange] = useMemo(() => {
    const determineBounds = () => {
      const {
        current: { element, lastBounds }
      } = state;

      if (element != null) {
        const { top, height } = element.getBoundingClientRect();

        if (
          !areBoundsEqual(lastBounds, {
            top,
            height
          })
        ) {
          setBounds(prevState => ({
            ...prevState,
            top,
            height
          }));
        }
      }
    };

    const resizeChange = () => {
      const {
        current: { element }
      } = state;
      if (element != null) {
        setSize({ width: element.offsetWidth, height: element.offsetHeight });
      }
    };

    return [
      debounce > 0
        ? createDebounce(determineBounds, debounce)
        : determineBounds,
      resizeChange
    ];
  }, [debounce]);

  const removeListeners = () => {
    const {
      current: { scrollContainers, resizeObserver, element }
    } = state;

    if (scrollContainers != null) {
      scrollContainers.forEach(scrollContainer => {
        scrollContainer.removeEventListener('scroll', scrollChange, true);
      });
      state.current.scrollContainers = null;
      resizeObserver.uninstall(element);
    }
  };

  const addListeners = () => {
    const {
      current: { scrollContainers, element }
    } = state;

    if (scrollContainers != null) {
      scrollContainers.forEach(scrollContainer => {
        scrollContainer.addEventListener('scroll', scrollChange, {
          capture: true,
          passive: true
        });
      });
      state.current.resizeObserver.listenTo(element, resizeChange);
    }
  };

  const update = useCallback((node: HTMLElement) => {
    const {
      current: { element }
    } = state;

    if (node != null && node !== element) {
      if (state != null && state.current != null) {
        state.current.element = node;
        state.current.scrollContainers = findScrollContainers(node);
        state.current.resizeObserver = elementResizeDetectorMaker({
          strategy: 'scroll'
        });
      }

      addListeners();

      if (callBack != null) {
        callBack(node);
      }
    }
    // eslint-disable-next-line consistent-return
    return () => {
      removeListeners();
    };
  }, []);

  const ref = useEffectRef(update);

  useEffect(() => removeListeners, []);

  return [ref, bounds];
};
