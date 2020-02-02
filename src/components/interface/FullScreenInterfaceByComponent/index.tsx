import { AnimatePresence } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

// import Header from '../../components/header';
import { OverviewProps } from 'src/typings/data/import';
import { WindowOptions } from '../../services/window';
import Window from '../windowByComponent';

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
  windowStackData?: Array<OverviewProps>;
  index?: number;
}

// const FullScreenInterface = ({ windowStack }: Props) => {
//   const isHidden = windowStack.length === 0;

//   return (
//     <Container isHidden={isHidden}>
//       <Header />
//       <AnimatePresence>
//         {windowStack.map((window, index) => (
//           <Window
//             key={`window-${window.id}`}
//             windowStack={windowStack}
//             index={index}
//             isHidden={index < windowStack.length - 1}
//           />
//         ))}
//       </AnimatePresence>
//     </Container>
//   );
// };

const FullScreenInterface = ({ windowStackData, index }: Props) => {
  const isHidden = windowStackData.length === 0;
  return (
    <Container isHidden={isHidden}>
      <AnimatePresence exitBeforeEnter>
        {/* {windowStackElements.map((windowStackElement, index) => ( */}
        <Window
          key={`window-${index}`}
          windowStackData={windowStackData}
          index={index}
          isHidden={index < windowStackData.length - 1}
        />
      </AnimatePresence>
    </Container>
  );
};

export default FullScreenInterface;
