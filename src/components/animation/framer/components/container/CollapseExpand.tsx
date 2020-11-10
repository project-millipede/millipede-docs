import { useHoux } from '@houx';
import { motion, useAnimation, Variants } from 'framer-motion';
import React, { FC, ReactNode, useEffect } from 'react';
import styled from 'styled-components';

import { RootState } from '../../../../../../docs/src/modules/redux/reducers';
import { Device } from '../../../../../typings/animation';

const AnimationRoot = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const AppRoot = styled(motion.div)`
  width: 100%;
  border-radius: 5px;
  border-style: double;
`;

interface CollapseExpandProps {
  children: ReactNode;
}

export const CollapseExpand: FC<CollapseExpandProps> = ({ children }) => {
  const {
    state: {
      animation: { device }
    }
  }: {
    state: RootState;
  } = useHoux();
  const controls = useAnimation();

  const variants: Variants = {
    min: { width: '50%' },
    max: {
      width: '100%'
    }
  };

  const minimize = () => controls.start('min');
  const maximize = () => controls.start('max');

  useEffect(() => {
    controls.stop();
    if (device === Device.Mobile) {
      minimize();
    }
    if (device === Device.Desktop) {
      maximize();
    }
  }, [device]);

  return (
    <AnimationRoot animate={controls}>
      <AppRoot variants={variants}>{children}</AppRoot>
    </AnimationRoot>
  );
};
