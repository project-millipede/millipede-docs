import { CustomIcon } from '@app/components';
import { ContentTypes } from '@app/types';
import { StringUtil } from '@app/utils';
import { Box, Grid, IconButton } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { StringParam, useQueryParams } from 'use-query-params';

import { TopReveal } from '../animation/framer/components/text/TopReveal';

interface TopicsViewDesktopProps {
  topics: Array<ContentTypes.OverviewProps>;
}

export const TopicsViewDesktop: FC<TopicsViewDesktopProps> = ({ topics }) => {
  const { asPath, push, pathname, locale } = useRouter();

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

  const [query] = useQueryParams({
    feature: StringParam,
    aspect: StringParam
  });

  useEffect(() => {
    const { feature = '', aspect = '' } = query;

    if (
      !StringUtil.isEmptyString(aspect) &&
      !StringUtil.isEmptyString(feature)
    ) {
      push(
        {
          pathname,
          query
        },
        asPath,
        { locale }
      );
    }
  }, []);

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
                            key={`topic-${topicId}-section-${sectionId}`}
                            onClick={_e => {
                              handleSelect(topic, section);
                            }}
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
