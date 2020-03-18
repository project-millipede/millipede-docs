import { TFunction } from 'next-i18next-serverless';
import React from 'react';

import { useTranslation } from '../../../../../../i18n';
import { Content } from '../../../../../../src/typings/data/import';
import Component from './component';

const generateContent = (t: TFunction): Array<Content> | any => {
  const steps: Array<Array<Content>> | string = t('steps', {
    returnObjects: true
  });
  if (steps === 'steps') {
    return [[]];
  }
  return steps;
};

const ns = 'pages/rethink-security/attackVectors/comparison/content';

const use = () => {
  const { t } = useTranslation(ns);

  const content = generateContent(t);

  return <Component rows={content} />;
};

export default use;
