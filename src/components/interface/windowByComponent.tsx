import { IconButton } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import { OverviewProps } from 'src/typings/data/import';
import styled from 'styled-components';

import CustomIcon from '../../../docs/src/modules/components/icon/CustomIcon';
import { noAnimation, slideRightAnimation } from '../animation';
import { TopReveal } from '../animation/framer/components/text/TopReveal';
import { useWindowService, WindowOptions } from '../services/window';

export interface ContainerProps {
  index?: number;
  showHeader?: boolean;
}

/** Responsible for putting the window at the proper z-index. */
export const Container = styled(motion.div)<ContainerProps>`
  /* z-index: ${props => props.index}; */
  /* position: absolute;
  top: ${props => (props.showHeader ? '20px' : 0)};
  bottom: 0;
  left: 0;
  right: 0;
  width: '100%';
  height: '100%'; */
  /* background: white; */
`;

export interface ContentTransitionContainerProps {
  isHidden: boolean;
}

/** Slides the view to the left if it isn't at the top of the stack. */
// export const ContentTransitionContainer = styled('div')<
//   ContentTransitionContainerProps
// >`
//   height: 100%;
//   transition: transform 0.3s;
//   transform: ${props => props.isHidden && 'translateX(-100%)'};
//   overflow: auto;
// `;

export const ContentTransitionContainer = styled('div')<
  ContentTransitionContainerProps
>`
  height: 100%;
  overflow: auto;
`;

interface Props {
  windowStack?: Array<WindowOptions>;
  windowStackElements?: Array<JSX.Element>;
  windowStackData?: Array<OverviewProps>;
  index: number;
  isHidden: boolean;
}

// const Window = ({ windowStack, index, isHidden }: Props) => {
//   const { headerTitle } = useWindowService();
//   const options = windowStack[index];
//   const firstInStack = index === 0;

//   console.log('index: ', index);

//   console.log('options.component: ', options.component);

//   return (
//     <Container
//       index={index}
//       showHeader={!!headerTitle}
//       {...(firstInStack ? noAnimation : slideRightAnimation)}
//     >
//       <ContentTransitionContainer isHidden={isHidden}>
//         <options.component />
//       </ContentTransitionContainer>
//     </Container>
//   );
// };

const Window = ({ windowStackData, index }: Props) => {
  const { headerTitle } = useWindowService();

  const router = useRouter();

  const firstInStack = index === 0;

  return windowStackData != null && windowStackData.length > 0 ? (
    <Container
      index={index}
      showHeader={!!headerTitle}
      {...(firstInStack ? noAnimation : slideRightAnimation)}
      // {...(firstInStack ? slideLeftAnimation : slideRightAnimation)}
    >
      {/* <ContentTransitionContainer isHidden={isHidden}> */}
      <TopReveal
        id={`animation-${index}`}
        text={[
          ...windowStackData[index].title,
          ...windowStackData[index].subTitle
        ]}
        outerIndex={index}
      />

      {windowStackData[index].contextLink
        ? windowStackData[index].contextLink.perspectives.map(perspective => {
            return (
              <IconButton
                onClick={() => {
                  router.push(
                    `${router.pathname}?${perspective.type}=${windowStackData[index].contextLink.id}#${windowStackData[index].contextLink.id}`
                  );
                }}
              >
                <CustomIcon icon={perspective.icon} />
              </IconButton>
            );
          })
        : null}

      {/* </ContentTransitionContainer> */}
    </Container>
  ) : null;
};

export default Window;
