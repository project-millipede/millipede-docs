import { motion, MotionStyle } from 'framer-motion';
import { forwardRef } from 'react';

interface Props {
  radius: number;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  style?: MotionStyle;
}

const CircleShape = forwardRef<SVGSVGElement, Props>(
  ({ radius, fillColor, strokeColor, strokeWidth, style }, ref) => {
    return (
      <motion.svg
        ref={ref}
        width={`${radius}`}
        height={`${radius}`}
        viewBox={`0 0 ${radius} ${radius}`}
        style={style}
      >
        <motion.circle
          cx={`${radius / 2}`}
          cy={`${radius / 2}`}
          r={`${radius / 4}`}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </motion.svg>
    );
  }
);

export default CircleShape;
