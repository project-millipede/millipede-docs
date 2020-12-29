import { ContentTypes } from '@app/types';
import { Container } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { isMobile } from 'react-device-detect';

import { TopicsViewDesktop } from './TopicsViewDesktop';
import { TopicsViewMobile } from './TopicsViewMobile';
import { translateObject } from './TranslateService';

export const TopicsHead = () => {
  const { t } = useTranslation();

  const topics = translateObject<ContentTypes.OverviewProps>(
    t,
    `pages/topics/index:topics`
  );

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
