import { ContentTypes } from '@app/types';
import { I18n } from '@app/utils';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FC } from 'react';

import { TopReveal } from '../animation/framer/components/text/TopReveal';
import { TopicsNavigation } from './TopicsNavigation';

export const TopicsHeadDesktop: FC<{ className?: string }> = ({
  className
}) => {
  const { t } = I18n.useTranslation('pages/topics/index');

  const topics = t<Array<ContentTypes.Topic>>(
    'topics',
    {},
    {
      returnObjects: true,
      fallback: []
    }
  );

  return (
    <Grid container className={className}>
      {topics && topics.length > 0
        ? topics.map((topic, index) => {
            const { id: topicId } = topic;
            return (
              <Grid
                key={`topic-${topicId}-desktop`}
                xs={12}
                md={index <= 1 ? 6 : 12}
              >
                <Box
                  sx={{
                    textAlign: 'center'
                  }}
                >
                  <TopReveal
                    id={`topic-${topicId}-desktop-animation`}
                    text={[...topic.title, ...topic.subTitle]}
                    loop={false}
                  />
                  <Box>
                    {topic.sections &&
                      topic.sections.map(section => {
                        const { id: sectionId, icon: sectionIcon } = section;
                        return (
                          <TopicsNavigation
                            key={`topic-${topicId}-section-${sectionId}-desktop-navigation`}
                            topicId={topicId}
                            sectionId={sectionId}
                            sectionIcon={sectionIcon}
                          />
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
