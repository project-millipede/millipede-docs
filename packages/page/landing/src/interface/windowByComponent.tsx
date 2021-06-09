import { CustomIcon } from '@app/components';
import { ContentTypes } from '@app/types';
import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { TopReveal } from '../animation/framer/components/text/TopReveal';

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
        feature: topic.id,
        aspect: section.id
      }
      // hash: `#head-${topic.id}-${section.id}`
    });
  };

  const topic =
    windowStackData &&
    windowStackData.length >= index &&
    windowStackData[index];

  const { id: topicId } = topic;

  return topic != null ? (
    <div className={classes.container}>
      <TopReveal
        id={`topic-${topic.category}-animation`}
        text={[...topic.title, ...topic.subTitle]}
      />
      <div className={classes.container}>
        {topic.sections &&
          topic.sections.map(section => {
            const { id: sectionId } = section;
            return (
              <IconButton
                key={`topic-${topicId}-section-${sectionId}`}
                onClick={_e => {
                  handleSelect(topic, section);
                }}
              >
                <CustomIcon icon={section.icon} />
              </IconButton>
            );
          })}
      </div>
    </div>
  ) : null;
};

export default Window;
