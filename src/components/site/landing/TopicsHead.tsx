import { useHoux } from '@houx';
import { Container } from '@material-ui/core';
import _ from 'lodash';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { RootState } from '../../../../docs/src/modules/redux/reducers';
import { OverviewProps } from '../../../typings/data/import';
import { TopicsViewDesktop } from './TopicsViewDesktop';
import { TopicsViewMobile } from './TopicsViewMobile';

const loadTopics = (t: Translate): Array<OverviewProps> => {
  const topics: Array<OverviewProps> = t(
    'pages/topics/index:topics',
    {},
    { returnObjects: true }
  );
  if (_.isArray(topics)) {
    return topics;
  }
  return [];
};

const TopicsHead = () => {
  const { t } = useTranslation();
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
