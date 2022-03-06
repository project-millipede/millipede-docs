import elementResizeDetectorMaker, { ErdmOptions } from 'element-resize-detector';
import { useCallback, useRef, useState } from 'react';

import { useCallbackRef } from './use-callback-ref';

export const useResize = (): [
  (node: HTMLElement) => void,
  Partial<DOMRectReadOnly>
] => {
  const resizeObserver = useRef<ResizeObserver>(null);

  const [bounds, setBounds] = useState<Partial<DOMRectReadOnly>>({
    width: 0,
    height: 0
  });

  const onResize = useCallback(
    (entries: Array<ResizeObserverEntry>, _observer: ResizeObserver) => {
      const [entry] = entries;

      setBounds(_state => {
        return entry.contentRect;
      });
    },
    []
  );

  const [setRef] = useCallbackRef<HTMLElement>(
    (node: HTMLElement) => {
      if (!resizeObserver.current) {
        resizeObserver.current = new ResizeObserver(onResize);
      }
      resizeObserver.current.observe(node);
    },
    (_node: HTMLElement) => {
      resizeObserver.current.disconnect();
      resizeObserver.current = null;
    }
  );

  return [setRef, bounds];
};

/**
 * Note:
 * The element-based resize observer is not in use anymore
 */

export const useResizeWithElement = (
  options: ErdmOptions = { strategy: 'scroll' }
): [(node: HTMLElement) => void, Partial<DOMRectReadOnly>] => {
  const [bounds, setBounds] = useState<Partial<DOMRectReadOnly>>({
    height: 0
  });

  const resizeDetector = useRef(elementResizeDetectorMaker(options));

  const [setRef] = useCallbackRef<HTMLElement>(
    (node: HTMLElement) => resizeDetector.current.listenTo(node, listener),
    (node: HTMLElement) => resizeDetector.current.removeListener(node, listener)
  );

  const listener = useCallback(
    (element: HTMLElement) => {
      setBounds({ width: element.offsetWidth, height: element.offsetHeight });
    },
    [setRef]
  );

  return [setRef, bounds];
};
