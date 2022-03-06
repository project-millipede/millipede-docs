import { CustomIcon, HiddenUnderlineLink } from '@app/components';
import { ContentTypes } from '@app/types';
import { Box, Grid, IconButton } from '@mui/material';
import React, { FC } from 'react';

import { TopReveal } from '../animation/framer/components/text/TopReveal';

interface TopicsViewDesktopProps {
  topics: Array<ContentTypes.OverviewProps>;
}

export const TopicsViewDesktop: FC<TopicsViewDesktopProps> = ({ topics }) => {
  return (
    <Grid container>
      {topics && topics.length > 0
        ? topics.map((topic, index) => {
            const { id: topicId } = topic;
            return (
              <Grid
                item
                key={`topic-${topicId}`}
                xs={12}
                md={index <= 1 ? 6 : 12}
              >
                <Box>
                  <TopReveal
                    id={`topic-${topicId}-animation`}
                    text={[...topic.title, ...topic.subTitle]}
                    loop={false}
                  />
                  <Box>
                    {topic.sections &&
                      topic.sections.map(section => {
                        const { id: sectionId } = section;
                        return (
                          <IconButton
                            component={HiddenUnderlineLink}
                            key={`topic-${topicId}-section-${sectionId}`}
                            href={{
                              pathname: '/',
                              query: {
                                feature: topic.id,
                                aspect: section.id
                              },
                              hash: `feature-${topic.id}-aspect-${section.id}`
                            }}
                            prefetch={false}
                            shallow
                          >
                            <CustomIcon icon={section.icon} />
                          </IconButton>
                        );
                      })}
                  </Box>
                </Box>
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};
