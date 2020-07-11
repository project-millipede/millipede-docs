import groupArray from 'group-array';
import _ from 'lodash';
import { TFunction } from 'next-i18next';
import React from 'react';

import { useTranslation } from '../../../../../i18n';
import { Category, CategoryDescriptor, OverviewProps } from '../../../../typings/data/import';
import Component from './ElementComponent';

const ns = 'pages/pidp/use-case/recognition/index';

const generateTopicData = (t: TFunction): Array<OverviewProps> => {
  const topics: Array<OverviewProps> = t('steps', { returnObjects: true });

  if (_.isArray(topics)) {
    return topics;
  }
  return [];
};

const ElementDescription = () => {
  const { t } = useTranslation(ns);

  const categoriesRaw: CategoryDescriptor = t('categories', {
    returnObjects: true
  });

  const topics = generateTopicData(t);

  const categorySections: Category = groupArray(topics, 'category');

  return (
    <>
      <Component elements={categorySections} categories={categoriesRaw} t={t} />
    </>
  );
};

export default ElementDescription;
