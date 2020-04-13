import { Grid, IconButton } from '@material-ui/core';
import { useHoux } from 'houx';
import { useRouter } from 'next/router';
import React, { Dispatch, FC } from 'react';

import CustomIcon from '../../../../docs/src/modules/components/icon/CustomIcon';
import { NavigationActions } from '../../../../docs/src/modules/redux/features/actionType';
import { loadPages } from '../../../../docs/src/modules/redux/features/navigation/actions';
import { OverviewProps } from '../../../typings/data/import';
import { TopReveal } from '../../animation/framer/components/text/TopReveal';

interface TopicsViewDesktopProps {
  topics: Array<OverviewProps>;
}

export const TopicsViewDesktop: FC<TopicsViewDesktopProps> = ({ topics }) => {
  const router = useRouter();

  const { dispatch }: { dispatch: Dispatch<NavigationActions> } = useHoux();

  return (
    <Grid container spacing={6}>
      {topics.length > 0
        ? topics.map((topic, index) => {
            return (
              <Grid
                key={`topic-${index}`}
                item
                xs={12}
                md={index <= 1 ? 6 : 12}
              >
                <TopReveal
                  id={`animation-${index}`}
                  text={[...topic.title, ...topic.subTitle]}
                  outerIndex={0}
                  loop={false}
                />

                {topic.contextLink
                  ? topic.contextLink.perspectives.map((perspective, index) => {
                      return (
                        <IconButton
                          key={`perspective-${index}`}
                          onClick={() => {
                            router.push(
                              `${router.pathname}?${perspective.type}=${topic.contextLink.id}#${topic.contextLink.id}`
                            );
                            dispatch(loadPages(`/${topic.contextLink.id}`));
                          }}
                        >
                          <CustomIcon icon={perspective.icon} />
                        </IconButton>
                      );
                    })
                  : null}
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};
