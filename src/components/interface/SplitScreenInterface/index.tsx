import { AnimatePresence } from 'framer-motion';
import React from 'react';
import styled, { css } from 'styled-components';

import { Header } from '../../components';
import { WindowOptions } from '../../services/window';
import Window from '../window';
import PreviewPanel from './previewPanel';

const Container = styled('div')`
  /* z-index: 2; */
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
`;

export interface PanelProps {
  isHidden: boolean;
}

export const LeftPanel = styled('div')<PanelProps>`
  /* z-index: 1; */
  position: relative;
  flex: 0 0 50%;
  box-shadow: 0 0 24px black;
  transition: all 0.35s;
  overflow: hidden;
  ${props =>
    props.isHidden &&
    css`
      transition-delay: 0.05s;
      transform: translateX(-100%);
      box-shadow: none;
    `};
`;

interface Props {
  windowStack: Array<WindowOptions>;
  menuHidden: boolean;
  allHidden: boolean;
}

const SplitScreenInterface = ({
  windowStack,
  menuHidden,
  allHidden
}: Props) => {
  return (
    <Container>
      <LeftPanel isHidden={menuHidden || allHidden}>
        <Header />
        <AnimatePresence>
          {windowStack.map((window, index) => (
            <Window
              key={`window-${window.id}`}
              // windowStack={windowStack}
              Comp={window.component}
              index={index}
              isHidden={index < windowStack.length - 1}
            />
          ))}
        </AnimatePresence>
      </LeftPanel>
      <PreviewPanel isHidden={allHidden} />
    </Container>
  );
};

export default SplitScreenInterface;
