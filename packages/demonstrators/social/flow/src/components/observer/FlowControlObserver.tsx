import { useEffectRef } from '@huse/effect-ref';
import elementResizeDetectorMaker from 'element-resize-detector';
import { CSSProperties, FC, ReactNode, useCallback } from 'react';

interface InteractionFlowControlObserverProps {
  handleControlOffset?: (value: number) => void;
  style?: CSSProperties;
  children: ReactNode;
}

const resizeDetector = elementResizeDetectorMaker({ strategy: 'scroll' });

export const FlowControlObserver: FC<InteractionFlowControlObserverProps> = ({
  handleControlOffset,
  style,
  children
}) => {
  const observeResize = useCallback((element: HTMLElement) => {
    const listener = () => {
      if (handleControlOffset != null) {
        handleControlOffset(element.offsetHeight);
      }
    };
    resizeDetector.listenTo(element, listener);

    return () => {
      resizeDetector.removeListener(element, listener);
    };
  }, []);

  const resizeControlRef = useEffectRef(observeResize);

  return (
    <div
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'column'
      }}
      ref={resizeControlRef}
    >
      {children}
    </div>
  );
};
