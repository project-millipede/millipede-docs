import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

import { fade } from '../../animation';
import Header from '../../components/header';
import { WindowOptions } from '../../services/window';

const Container = styled(motion.div)`
  z-index: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  window?: WindowOptions;
}

const CoverFlowInterface = ({ window }: Props) => {
  return (
    <AnimatePresence>
      {window && (
        <Container {...fade}>
          <Header />
          <window.component />
        </Container>
      )}
    </AnimatePresence>
  );
};

export default CoverFlowInterface;
