import createDebounce from 'lodash/debounce';
import { useMemo, useRef, useState } from 'react';

import { useCallbackRef } from './use-callback-ref';
import { areBoundsEqual, findScrollContainersWithOverflow, HTMLOrSVGElement, Overflow, TOverflow } from './utils/element';

export const boundKeys: Array<keyof DOMRectReadOnly> = ['top', 'height'];

export type State = {
  element?: HTMLOrSVGElement | null;
  scrollContainers: Array<HTMLOrSVGElement> | null;
  lastBounds: Partial<DOMRectReadOnly>;
  resizeObserver: ResizeObserver | null;
};

export type Options = {
  debounce?: number;
  callBack?: (node: HTMLOrSVGElement) => void;
  withCapture?: boolean;
  withOverflow?: boolean;
  overflowType?: TOverflow;
  passive?: boolean;
};

export const useScroll = ({
  debounce = 60,
  callBack,
  withCapture = true,
  withOverflow = true,
  overflowType = Overflow.y,
  passive = true
}: Options): [(node: HTMLOrSVGElement) => void, Partial<DOMRectReadOnly>] => {
  const [bounds, setBounds] = useState<Partial<DOMRectReadOnly>>({});

  const state = useRef<State>({
    element: null,
    scrollContainers: null,
    resizeObserver: null,
    lastBounds: bounds
  });

  const [setRef] = useCallbackRef<HTMLOrSVGElement>(
    (node: HTMLOrSVGElement) => {
      const {
        current: { element }
      } = state;

      if (node != null && node !== element) {
        state.current.element = node;

        const size = state.current.element.getBoundingClientRect();
        state.current.lastBounds = size;
        setBounds(() => size);

        state.current.scrollContainers = withOverflow
          ? findScrollContainersWithOverflow(node, overflowType)
          : [node.parentElement];

        state.current.resizeObserver = new ResizeObserver(scrollChange);
        state.current.resizeObserver!.observe(state.current.element);

        addListeners(
          state.current.scrollContainers,
          scrollChange,
          withCapture,
          passive
        );

        if (callBack != null) {
          callBack(node);
        }
      }
    },
    (_node: HTMLOrSVGElement) => {
      removeListeners(state.current.scrollContainers, scrollChange);
      state.current.scrollContainers = null;

      if (state.current.resizeObserver) {
        state.current.resizeObserver.disconnect();
        state.current.resizeObserver = null;
      }
    }
  );

  const [scrollChange] = useMemo(() => {
    const determineBounds = () => {
      const {
        current: { element, lastBounds }
      } = state;
      const size = element.getBoundingClientRect();
      // if (!areBoundsEqual(boundKeys, lastBounds, size)) {
      //   state.current.lastBounds = size;
      //   setBounds(() => size);
      // } else {
      //   setBounds(_state => size);
      // }

      if (withOverflow) {
        if (!areBoundsEqual(boundKeys, lastBounds, size)) {
          state.current.lastBounds = size;
          setBounds(_state => size);
        }
      } else {
        setBounds(_state => size);
      }
    };
    return [
      debounce > 0 ? createDebounce(determineBounds, debounce) : determineBounds
    ];
  }, [setRef, debounce]);

  return [setRef, bounds];
};

const addListeners = (
  scrollContainers: Array<HTMLOrSVGElement> | null,
  scrollChange: EventListener,
  withCapture: boolean,
  passive: boolean
) => {
  if (scrollContainers != null) {
    scrollContainers.forEach(scrollContainer => {
      scrollContainer.addEventListener(
        'scroll',
        scrollChange,
        passive
          ? {
              capture: withCapture,
              passive: true
            }
          : {
              capture: withCapture
            }
      );
    });
  }
};

const removeListeners = (
  scrollContainers: Array<HTMLOrSVGElement> | null,
  scrollChange: EventListener
) => {
  if (scrollContainers != null) {
    scrollContainers.forEach(scrollContainer => {
      scrollContainer.removeEventListener('scroll', scrollChange);
    });
  }
};
