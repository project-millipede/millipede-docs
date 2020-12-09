import { useHoux } from '@app/houx';
import { Device } from '@demonstrator/types';
import { motion, useAnimation, Variants } from 'framer-motion';
import React, { FC, ReactNode, useEffect } from 'react';
import styled from 'styled-components';

import { RootState } from '../../redux/features/reducers';

const AnimationRoot = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AppRoot = styled(motion.div)`
  width: 100%;
  border-radius: 5px;
  border-style: solid;
  border-width: thin;
  border-color: lightgray;
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
