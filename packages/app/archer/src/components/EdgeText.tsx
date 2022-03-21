import { red } from '@mui/material/colors';
import { FC, useEffect, useRef, useState } from 'react';

const labelBgPadding = [2, 4];
const labelBgBorderRadius = 2;

export interface EdgeTextProps {
  x: number;
  y: number;
}
export const EdgeText: FC<EdgeTextProps> = ({ x, y, children }) => {
  const textRef = useRef<SVGTextElement>(null);
  const [textBoundingBox, setTextBoundingBox] = useState<Partial<DOMRect>>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });

  useEffect(() => {
    if (textRef.current) {
      const boundingBox = textRef.current.getBBox();
      setTextBoundingBox({
        x: boundingBox.x,
        y: boundingBox.y,
        width: boundingBox.width,
        height: boundingBox.height
      });
    }
  }, [textRef.current]);

  return (
    <g
      transform={`translate(${x - textBoundingBox.width / 2} ${
        y - textBoundingBox.height / 2
      })`}
      pointerEvents='all'
    >
      <rect
        width={textBoundingBox.width + 2 * labelBgPadding[0]}
        height={textBoundingBox.height + 2 * labelBgPadding[1]}
        x={-labelBgPadding[0]}
        y={-labelBgPadding[1]}
        rx={labelBgBorderRadius}
        ry={labelBgBorderRadius}
        fill={red[500]}
      />
      <text
        ref={textRef}
        dominantBaseline='central'
        y={textBoundingBox.height / 2}
      >
        {children}
      </text>
    </g>
  );
};
