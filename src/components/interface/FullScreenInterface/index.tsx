import { AnimatePresence } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

import Header from '../../components/header';
import { WindowOptions } from '../../services/window';
import Window from '../window';

export interface ContainerProps {
  isHidden?: boolean;
}

const Container = styled('div')<ContainerProps>`
  /* z-index: 3; */
  /* position: absolute;
  height: 100%;
  width: 100%; */
  /* background: white; */
  /* transition: all 0.35s; */
  /* transform: ${props => props.isHidden && 'translateX(100%)'}; */
`;

interface Props {
  windowStack?: Array<WindowOptions>;
  windowStackElements?: Array<JSX.Element>;
  index?: number;
}

const FullScreenInterface = ({ windowStack }: Props) => {
  const isHidden = windowStack.length === 0;

  return (
    <Container isHidden={isHidden}>
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
    </Container>
  );
};

// const FullScreenInterfaceModified = ({ windowStackElements, index }: Props) => {
//   const isHidden = windowStackElements.length === 0;
//   return (
//     <Container isHidden={isHidden}>
//       <AnimatePresence exitBeforeEnter>
//         {/* {windowStackElements.map((windowStackElement, index) => ( */}
//         <Window
//           key={`window-${index}`}
//           windowStackElements={windowStackElements}
//           index={index}
//           isHidden={index < windowStackElements.length - 1}
//         />
//       </AnimatePresence>
//     </Container>
//   );
// };

export default FullScreenInterface;
