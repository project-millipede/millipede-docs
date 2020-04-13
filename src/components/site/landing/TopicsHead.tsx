import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useHoux } from 'houx';
import _ from 'lodash';
import { TFunction } from 'next-i18next-serverless';
import React from 'react';

import { RootState } from '../../../../docs/src/modules/redux/reducers';
import { useTranslation } from '../../../../i18n';
import { OverviewProps } from '../../../typings/data/import';
import { TopicsViewDesktop } from './TopicsViewDesktop';
import { TopicsViewMobile } from './TopicsViewMobile';

const loadTopics = (t: TFunction): Array<OverviewProps> => {
  const topics: Array<OverviewProps> = t('topics', { returnObjects: true });
  if (_.isArray(topics)) {
    return topics;
  }
  return [];
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6)
    }
  })
);

const ns = 'pages/topics/index';

const TopicsHead = () => {
  const { t } = useTranslation(ns);
  const {
    state: {
      view: { isMobile }
    }
  }: {
    state: RootState;
  } = useHoux();
  const classes = useStyles();

  const topics = loadTopics(t);

  return (
    <div className={classes.root}>
      {isMobile ? (
        <TopicsViewMobile topics={topics} />
      ) : (
        <TopicsViewDesktop topics={topics} />
      )}
    </div>
  );
};

export default TopicsHead;
