import { CustomIcon } from '@app/components';
import { useHoux } from '@app/houx';
import { actions as layoutActions, NavigationActions } from '@app/layout';
import { ContentTypes } from '@app/types';
import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { Dispatch, FC } from 'react';
import styled from 'styled-components';

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
  windowStackData?: Array<ContentTypes.OverviewProps>;
  index: number;
}

const Window: FC<WindowProps> = ({ windowStackData, index }) => {
  const classes = useStyles();

  const { pathname, push } = useRouter();

  const { navigation } = layoutActions;

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
          ? windowStackData[index].contextLink.sections.map(
              (section, pIndex) => {
                return (
                  <IconButton
                    key={`section-${pIndex}`}
                    onClick={() => {
                      push(
                        `${pathname}?${section.id}=${windowStackData[index].contextLink.id}#${windowStackData[index].contextLink.id}`
                      );
                      dispatch(
                        navigation.loadPages(
                          `/${windowStackData[index].contextLink.id}`
                        )
                      );
                    }}
                  >
                    <CustomIcon icon={section.icon} />
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
