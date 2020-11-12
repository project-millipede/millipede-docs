import { useHoux } from '@houx';
import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { Dispatch, FC } from 'react';
import { OverviewProps } from 'src/typings/data/import';
import styled from 'styled-components';

import CustomIcon from '../../../docs/src/modules/components/icon/CustomIcon';
import { NavigationActions } from '../../../docs/src/modules/redux/features/actionType';
import { loadPages } from '../../../docs/src/modules/redux/features/navigation/actions';
import { noAnimation } from '../animation';
import { TopReveal } from '../animation/framer/components/text/TopReveal';

export const AnimationContainer = styled(motion.div)``;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2, 0),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4, 0)
      }
    }
  })
);

interface WindowProps {
  windowStackData?: Array<OverviewProps>;
  index: number;
}

const Window: FC<WindowProps> = ({ windowStackData, index }) => {
  const classes = useStyles();

  const { pathname, push } = useRouter();

  const { dispatch }: { dispatch: Dispatch<NavigationActions> } = useHoux();

  return windowStackData != null && windowStackData.length > 0 ? (
    <div className={classes.container}>
      <div className={classes.container}>
        <AnimationContainer key={`topic-${index}`} {...noAnimation}>
          <TopReveal
            id={`animation-${index}`}
            key={`animation-${index}`}
            text={[
              ...windowStackData[index].title,
              ...windowStackData[index].subTitle
            ]}
            outerIndex={index}
          />
        </AnimationContainer>
      </div>
      <div className={classes.container}>
        {windowStackData[index].contextLink
          ? windowStackData[index].contextLink.perspectives.map(
              (perspective, pIndex) => {
                return (
                  <IconButton
                    key={`perspective-${pIndex}`}
                    onClick={() => {
                      push(
                        `${pathname}?${perspective.type}=${windowStackData[index].contextLink.id}#${windowStackData[index].contextLink.id}`
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
      </div>
    </div>
  ) : null;
};

export default Window;
