import { CustomIcon } from '@app/components';
import { ContentTypes } from '@app/types';
import { StringUtil } from '@app/utils';
import { createStyles, Grid, IconButton, makeStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { StringParam, useQueryParams } from 'use-query-params';

import { TopReveal } from '../animation/framer/components/text/TopReveal';

interface TopicsViewDesktopProps {
  topics: Array<ContentTypes.OverviewProps>;
}

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

export const TopicsViewDesktop: FC<TopicsViewDesktopProps> = ({ topics }) => {
  const { asPath, push, pathname, locale } = useRouter();

  const classes = useStyles();

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
      {topics.length > 0
        ? topics.map((topic, index) => {
            return (
              <Grid
                key={`topic-${index}`}
                item
                xs={12}
                md={index <= 1 ? 6 : 12}
              >
                <div className={classes.container}>
                  <div className={classes.container}>
                    <TopReveal
                      id={`animation-${index}`}
                      text={[...topic.title, ...topic.subTitle]}
                      outerIndex={0}
                      loop={false}
                    />
                  </div>
                  <div className={classes.container}>
                    {topic.contextLink
                      ? topic.contextLink.sections.map((section, index) => {
                          return (
                            <IconButton
                              key={`section--${index}`}
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
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};
