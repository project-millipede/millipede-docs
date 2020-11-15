import { click } from '@plusnew/simulate-dom-events';
import { motion, useAnimation } from 'framer-motion';
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';

import CircleShape from './shapes/circle';

interface CursorProps {
  selector: string;
}

export const measure = (element: HTMLElement) => {
  if (element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + window.pageXOffset;
    const y = rect.top + window.pageYOffset;
    return { x, y, width: rect.width, height: rect.height };
  }
};

export const cursorVariant = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0 }
};

const mRadius = 25;
const mFillColor = '#e57373';
const mStrokeColor = '#e57373';
const mStrokeWidth = 1;

export const Cursor: FC<CursorProps> = ({ selector }) => {
  const cursorRef = useRef<SVGSVGElement>();

  const getSelectedElement = useCallback(() => {
    if (selector) {
      return document.querySelector<HTMLElement>(selector);
    }
  }, [selector]);

  const cursorVisiblityControl = useAnimation();

  useEffect(() => {
    return () => cursorVisiblityControl.stop();
  }, [selector]);

  const coordinates = useMemo(() => {
    if (selector) {
      const element = getSelectedElement();
      return measure(element);
    }
    return { x: 0, y: 0, width: 0, height: 0 };
  }, [selector]);

  const show = () => cursorVisiblityControl.start('visible');
  const hide = () => cursorVisiblityControl.start('hidden');

  const onStart = () => {
    show();
  };

  const onComplete = () => {
    hide();
    const element = getSelectedElement();
    if (element != null) {
      click(element);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0
      }}
    >
      <motion.div
        animate={{
          x: coordinates?.x,
          y: coordinates?.y
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
        onAnimationStart={onStart}
        onAnimationComplete={onComplete}
      >
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: coordinates?.width,
            height: coordinates?.height
          }}
          variants={cursorVariant}
          animate={cursorVisiblityControl}
        >
          <CircleShape
            ref={cursorRef}
            radius={mRadius}
            fillColor={mFillColor}
            strokeColor={mStrokeColor}
            strokeWidth={mStrokeWidth}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
