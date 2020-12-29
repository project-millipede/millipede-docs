import { usePrevious } from 'ahooks';
import { motion, useAnimation } from 'framer-motion';
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';

import { measure, measureOffset } from './Cursor.svc';
import { click } from './dom-events';
import CircleShape from './shapes/circle';

const cursorVariant = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0 }
};

const mRadius = 25;
const mFillColor = '#e57373';
const mStrokeColor = '#e57373';
const mStrokeWidth = 1;

interface CursorProps {
  selector: string;
}

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

  const previousCoordinates = usePrevious(coordinates);

  const distance = useMemo(() => {
    return measureOffset(
      { x: coordinates.x, y: coordinates.y },
      {
        x: previousCoordinates ? previousCoordinates.x : 0,
        y: previousCoordinates ? previousCoordinates.y : 0
      }
    );
  }, [selector]);

  const show = () => cursorVisiblityControl.start('visible');
  const hide = () => cursorVisiblityControl.start('hidden');

  const onStart = () => {
    show();
  };

  const onComplete = () => {
    const element = getSelectedElement();
    if (element != null) {
      click(element);
    }
    hide();
  };

  return (
    <motion.div
      key={`animate-${selector}`}
      style={{
        position: 'absolute',
        top: previousCoordinates ? previousCoordinates.y : 0,
        left: previousCoordinates ? previousCoordinates.x : 0
      }}
      animate={{
        x: distance.x,
        y: distance.y
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
          width: coordinates.width,
          height: coordinates.height
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
  );
};
