import createDebounce from 'lodash/debounce';
import { useMemo, useRef, useState } from 'react';

import { useCallbackRef } from './use-callback-ref';
import {
  areBoundsEqual,
  findScrollContainersWithOverflow,
  HTMLOrSVGElementCustom,
  Overflow,
  TOverflow,
} from './utils/element';

export const boundKeys: Array<keyof DOMRectReadOnly> = ['top', 'height'];

export type State = {
  element?: HTMLOrSVGElementCustom | null;
  scrollContainers: Array<HTMLOrSVGElementCustom> | null;
  lastBounds: Partial<DOMRectReadOnly>;
};

export type Options = {
  debounce?: number;
  callBack?: (node: HTMLElement) => void;
  withCapture?: boolean;
  withOverflow?: boolean;
  overflowType?: TOverflow;
};

export const useScroll = ({
  debounce = 60,
  callBack,
  withCapture = true,
  withOverflow = true,
  overflowType = Overflow.y
}: Options): [(node: HTMLElement) => void, Partial<DOMRectReadOnly>] => {
  const [bounds, setBounds] = useState<Partial<DOMRectReadOnly>>({});

  const state = useRef<State>({
    element: null,
    scrollContainers: null,
    lastBounds: bounds
  });

  const [setRef] = useCallbackRef<HTMLElement>(
    (node: HTMLElement) => {
      const {
        current: { element }
      } = state;

      if (node != null && node !== element) {
        state.current.element = node;

        state.current.scrollContainers = withOverflow
          ? findScrollContainersWithOverflow(node, overflowType)
          : [node.parentElement];

        addListeners(state.current.scrollContainers, scrollChange, withCapture);

        if (callBack != null) {
          callBack(node);
        }
      }
    },
    (_node: HTMLElement) => {
      removeListeners(state.current.scrollContainers, scrollChange);
      state.current.scrollContainers = null;
    }
  );

  const [scrollChange] = useMemo(() => {
    const determineBounds = () => {
      const {
        current: { element, lastBounds }
      } = state;
      const size = element.getBoundingClientRect();
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
  scrollContainers: Array<HTMLOrSVGElementCustom> | null,
  scrollChange: EventListener,
  withCapture: boolean
) => {
  if (scrollContainers != null) {
    scrollContainers.forEach(scrollContainer => {
      scrollContainer.addEventListener('scroll', scrollChange, {
        capture: withCapture,
        passive: true
      });
    });
  }
};

const removeListeners = (
  scrollContainers: Array<HTMLOrSVGElementCustom> | null,
  scrollChange: EventListener
) => {
  if (scrollContainers != null) {
    scrollContainers.forEach(scrollContainer => {
      scrollContainer.removeEventListener('scroll', scrollChange);
    });
  }
};
