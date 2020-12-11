import { ContentTypes } from '@app/types';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Component from './component';

const generateContent = (t: Translate) => {
  return (
    t<Array<Array<ContentTypes.Content>>>(
      'pages/rethink-security/attackVectors/comparison/content:steps',
      {},
      {
        returnObjects: true
      }
    ) || [[]]
  );
};

const use = () => {
  const { t } = useTranslation();

  const content = generateContent(t);

  return <Component rows={content} />;
};

export default use;
