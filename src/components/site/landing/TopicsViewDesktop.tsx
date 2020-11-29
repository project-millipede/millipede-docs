import { CustomIcon } from '@app/components';
import { useHoux } from '@app/houx';
import { actions as layoutActions, NavigationActions } from '@app/layout';
import { createStyles, Grid, IconButton, makeStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { Dispatch, FC } from 'react';

import { OverviewProps } from '../../../typings/data/import';
import { TopReveal } from '../../animation/framer/components/text/TopReveal';

interface TopicsViewDesktopProps {
  topics: Array<OverviewProps>;
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
  const { pathname, push } = useRouter();

  const classes = useStyles();

  const { dispatch }: { dispatch: Dispatch<NavigationActions> } = useHoux();

  const { navigation } = layoutActions;

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
                      ? topic.contextLink.perspectives.map(
                          (perspective, index) => {
                            return (
                              <IconButton
                                key={`perspective-${index}`}
                                onClick={() => {
                                  push(
                                    `${pathname}?${perspective.type}=${topic.contextLink.id}#${topic.contextLink.id}`
                                  );
                                  dispatch(
                                    navigation.loadPages(
                                      `/${topic.contextLink.id}`
                                    )
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
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};
