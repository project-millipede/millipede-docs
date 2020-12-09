import groupArray from 'group-array';
import _ from 'lodash';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { Category, CategoryDescriptor, OverviewProps } from '../../../../typings/data/import';
import Component from './ElementComponent';

const generateTopicData = (t: Translate): Array<OverviewProps> => {
  const topics: Array<OverviewProps> = t(
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

  const categoriesRaw = t<CategoryDescriptor>(
    'pages/pidp/use-case/recognition/index:categories',
    {},
    {
      returnObjects: true
    }
  );

  const topics = generateTopicData(t);

  const categorySections: Category = groupArray(topics, 'category');

  return (
    <>
      <Component elements={categorySections} categories={categoriesRaw} t={t} />
    </>
  );
};

export default ElementDescription;
