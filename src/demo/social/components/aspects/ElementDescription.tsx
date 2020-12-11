import { ContentTypes } from '@app/types';
import groupArray from 'group-array';
import _ from 'lodash';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Component from './ElementComponent';

const generateTopicData = (t: Translate): Array<ContentTypes.OverviewProps> => {
  const topics = t<ContentTypes.OverviewProps>(
    'pages/pidp/use-case/recognition/index:steps',
    {},
    { returnObjects: true }
  );

  if (_.isArray(topics)) {
    return topics;
  }
  return [];
};

const ElementDescription = () => {
  const { t } = useTranslation();

  const categoriesRaw = t<ContentTypes.CategoryDescriptor>(
    'pages/pidp/use-case/recognition/index:categories',
    {},
    {
      returnObjects: true
    }
  );

  const topics = generateTopicData(t);

  const categorySections: ContentTypes.Category = groupArray(
    topics,
    'category'
  );

  return (
    <Component
      elements={categorySections as any}
      categories={categoriesRaw}
      t={t}
    />
  );
};

export default ElementDescription;
