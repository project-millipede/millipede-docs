import { Container } from '@material-ui/core';
import { useHoux } from 'houx';
import _ from 'lodash';
import { TFunction } from 'next-i18next';
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
  const topics = loadTopics(t);

  return (
    <Container maxWidth='md'>
      {isMobile ? (
        <TopicsViewMobile topics={topics} />
      ) : (
        <TopicsViewDesktop topics={topics} />
      )}
    </Container>
  );
};

export default TopicsHead;
