import { CustomIcon } from '@app/components';
import { ContentTypes } from '@app/types';
import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
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

  const { push } = useRouter();

  const handleSelect = (
    topic: ContentTypes.OverviewProps,
    section: ContentTypes.Section
  ) => {
    push({
      pathname: `/`,
      query: {
        feature: topic.contextLink.id,
        aspect: section.id
      }
      // hash: `#head-${topic.contextLink.id}-${section.id}`
    });
  };

  const topic = windowStackData[index];

  return windowStackData != null && windowStackData.length > 0 ? (
    <div className={classes.container}>
      <div className={classes.container}>
        <AnimationContainer key={`topic-${index}`} {...noAnimation}>
          <TopReveal
            id={`animation-${index}`}
            key={`animation-${index}`}
            text={[...topic.title, ...topic.subTitle]}
            outerIndex={index}
          />
        </AnimationContainer>
      </div>
      <div className={classes.container}>
        {topic.contextLink
          ? topic.contextLink.sections.map((section, index) => {
              return (
                <IconButton
                  key={`section-${index}`}
                  onClick={_e => {
                    handleSelect(topic, section);
                  }}
                >
                  <CustomIcon icon={section.icon} />
                </IconButton>
              );
            })
          : null}
      </div>
    </div>
  ) : null;
};

export default Window;
