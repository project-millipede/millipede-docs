import { IconButton } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useHoux } from 'houx';
import { useRouter } from 'next/router';
import React, { Dispatch, FC } from 'react';
import { OverviewProps } from 'src/typings/data/import';
import styled from 'styled-components';

import CustomIcon from '../../../docs/src/modules/components/icon/CustomIcon';
import { NavigationActions } from '../../../docs/src/modules/redux/features/actionType';
import { loadPages } from '../../../docs/src/modules/redux/features/navigation/actions';
import { noAnimation } from '../animation';
import { TopReveal } from '../animation/framer/components/text/TopReveal';

export const Container = styled(motion.div)``;

interface WindowProps {
  windowStackData?: Array<OverviewProps>;
  index: number;
}

const Window: FC<WindowProps> = ({ windowStackData, index }) => {
  const router = useRouter();

  const { dispatch }: { dispatch: Dispatch<NavigationActions> } = useHoux();

  return windowStackData != null && windowStackData.length > 0 ? (
    <Container key={`topic-${index}`} {...noAnimation}>
      <TopReveal
        id={`animation-${index}`}
        key={`animation-${index}`}
        text={[
          ...windowStackData[index].title,
          ...windowStackData[index].subTitle
        ]}
        outerIndex={index}
      />

      {windowStackData[index].contextLink
        ? windowStackData[index].contextLink.perspectives.map(
            (perspective, pIndex) => {
              return (
                <IconButton
                  key={`perspective-${pIndex}`}
                  onClick={() => {
                    router.push(
                      `${router.pathname}?${perspective.type}=${windowStackData[index].contextLink.id}#${windowStackData[index].contextLink.id}`
                    );
                    dispatch(
                      loadPages(`/${windowStackData[index].contextLink.id}`)
                    );
                  }}
                >
                  <CustomIcon icon={perspective.icon} />
                </IconButton>
              );
            }
          )
        : null}
    </Container>
  ) : null;
};

export default Window;
