import { AnimatePresence } from 'framer-motion';
import React from 'react';
import styled, { css } from 'styled-components';

import { Previews } from '../../app/previews';
import { useWindowService } from '../../services/window';

import { PREVIEW } from '../../app/previews/Preview';

export interface ContainerProps {
  isHidden: boolean;
}

const Container = styled('div')<ContainerProps>`
  /* z-index: 0; */
  position: relative;
  flex: 0 0 50%;
  background: white;
  transition: all 0.35s;
  ${props =>
    props.isHidden &&
    css`
      transform: translateX(100%);
      opacity: 0;
      overflow: hidden;
    `};
`;

interface Props {
  isHidden: boolean;
}

const PreviewPanel = ({ isHidden }: Props) => {
  const { preview } = useWindowService();
  const PreviewComponent = Previews[preview];

  return (
    <Container isHidden={isHidden}>
      <AnimatePresence>
        {/* Music preview slides in, whereas the other previews simply appear. */}
        {preview === PREVIEW.MUSIC && <PreviewComponent />}
      </AnimatePresence>
      {preview !== PREVIEW.MUSIC && <PreviewComponent />}
    </Container>
  );
};

export default PreviewPanel;
