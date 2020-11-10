import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { Content } from '../../../../../../src/typings/data/import';
import Component from './component';

const generateContent = (t: Translate): Array<Content> | any => {
  const steps: Array<Array<Content>> | string = t(
    'pages/rethink-security/attackVectors/comparison/content:steps',
    {},
    {
      returnObjects: true
    }
  );
  if (steps === 'steps') {
    return [[]];
  }
  return steps;
};

const use = () => {
  const { t } = useTranslation();

  const content = generateContent(t);

  return <Component rows={content} />;
};

export default use;
