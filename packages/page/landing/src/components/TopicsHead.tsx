import { Components } from '@app/render-utils';
import { ContentTypes } from '@app/types';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { TopicsViewDesktop } from './TopicsViewDesktop';
import { TopicsViewMobile } from './TopicsViewMobile';
import { translateObject } from './TranslateService';

const {
  Responsive: { Mobile, Desktop }
} = Components;

export const TopicsHead = () => {
  const { t } = useTranslation();

  const topics = translateObject<ContentTypes.OverviewProps>(
    t,
    `pages/topics/index:topics`
  );

  return (
    <>
      <Mobile>
        <TopicsViewMobile topics={topics} />
      </Mobile>
      <Desktop>
        <TopicsViewDesktop topics={topics} />
      </Desktop>
    </>
  );
};
