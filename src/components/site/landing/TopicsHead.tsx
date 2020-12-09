import { useHoux } from '@app/houx';
import { RootState as LayoutState } from '@app/layout';
import { Container } from '@material-ui/core';
import _ from 'lodash';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { OverviewProps } from '../../../typings/data/import';
import { TopicsViewDesktop } from './TopicsViewDesktop';
import { TopicsViewMobile } from './TopicsViewMobile';

const loadTopics = (t: Translate) => {
  const topics = t<Array<OverviewProps>>(
    'pages/topics/index:topics',
    {},
    { returnObjects: true }
  );
  if (_.isArray(topics)) {
    return topics;
  }
  return [];
};

export const TopicsHead = () => {
  const { t } = useTranslation();

  const {
    state: { view: { isMobile } } = {
      view: {
        isMobile: false
      }
    } as any
  }: { state: LayoutState } = useHoux();

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
