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
        feature: topic.contextLink.id,
        aspect: section.id
      }
      // hash: `#head-${topic.contextLink.id}-${section.id}`
    });
  };

  const topic =
    windowStackData && windowStackData.length >= index
      ? windowStackData[index]
      : {};

  return topic != null ? (
    <div className={classes.container}>
      <TopReveal
        id={`animation-${index}`}
        text={[...topic.title, ...topic.subTitle]}
      />
      <div className={classes.container}>
        {topic.contextLink &&
          topic.contextLink.sections.map((section, index) => {
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
          })}
      </div>
    </div>
  ) : null;
};

export default Window;
