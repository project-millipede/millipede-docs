import { EffectRef, useEffectRef } from '@huse/effect-ref';
import { debounce as createDebounce } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type Options = {
  debounce?: number;
  callBack?: (node: HTMLElement) => void;
};

type State = {
  element: HTMLElement | null;
  scrollContainers: Array<HTMLElement> | null;
  lastBounds: Partial<DOMRect>;
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
    height: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    x: 0,
    y: 0
  });

  const state = useRef<State>({
    element: null,
    scrollContainers: null,
    lastBounds: bounds
  });

  const removeListeners = () => {
    const {
      current: { scrollContainers }
    } = state;

    if (scrollContainers != null) {
      scrollContainers.forEach(scrollContainer => {
        scrollContainer.removeEventListener('scroll', scrollChange, true);
      });
      if (state != null && state.current != null) {
        state.current.scrollContainers = null;
      }
    }
  };

  const addListeners = () => {
    const {
      current: { scrollContainers }
    } = state;

    if (scrollContainers != null) {
      scrollContainers.forEach(scrollContainer => {
        scrollContainer.addEventListener('scroll', scrollChange, {
          capture: true,
          passive: true
        });
      });
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

  const [scrollChange] = useMemo(() => {
    const determineBounds = () => {
      const {
        current: { element, lastBounds }
      } = state;

      if (element != null) {
        const {
          top,
          height,
          bottom,
          left,
          right,
          width,
          x,
          y
        } = element.getBoundingClientRect();

        if (
          !areBoundsEqual(lastBounds, {
            top,
            height,
            bottom,
            left,
            right,
            width,
            x,
            y
          })
        ) {
          setBounds(prevState => ({
            ...prevState,
            top,
            height,
            bottom,
            left,
            right,
            width,
            x,
            y
          }));
        }
      }
    };

    return [
      debounce > 0 ? createDebounce(determineBounds, debounce) : determineBounds
    ];
  }, [debounce, setBounds]);

  useEffect(() => removeListeners, []);

  return [ref, bounds];
};
