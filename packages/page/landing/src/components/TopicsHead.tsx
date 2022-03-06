import { Components } from '@app/render-utils';
import { ContentTypes } from '@app/types';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { TopicsViewDesktop } from './TopicsViewDesktop';
import { TopicsViewMobile } from './TopicsViewMobile';
import { translateObject } from './TranslateService';

const {
  Media: { Media }
} = Components;

export const TopicsHead: FC = () => {
  const { t } = useTranslation();

  const topics = translateObject<ContentTypes.OverviewProps>(
    t,
    `pages/topics/index:topics`
  );

  return (
    <>
      <Media lessThan='md'>
        <TopicsViewMobile topics={topics} />
      </Media>
      <Media greaterThanOrEqual='md'>
        <TopicsViewDesktop topics={topics} />
      </Media>
    </>
  );
};
