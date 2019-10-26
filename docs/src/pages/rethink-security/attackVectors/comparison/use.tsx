import { TFunction } from 'next-i18next-serverless';
import React from 'react';
import { WithTranslation } from 'react-i18next';

import { withTranslation } from '../../../../../../i18n';
import { Content } from '../../../../../../src/typings/data/import';
import Component from './component';

const generateContent = (t: TFunction): Array<Content> | any => {
  const steps: Array<Array<Content>> | string = t('steps', { returnObjects: true });
  if (steps === 'steps') {
    return [[]];
  }
  return steps;
};

type Props = WithTranslation;

const use = ({ t }: Props) => {
  const content = generateContent(t);

  return <Component rows={content} />;
};

use.getInitialProps = async () => {
  return {
    namespacesRequired: ['pages/rethink-security/attackVectors/comparison/content']
  };
};

export default withTranslation('pages/rethink-security/attackVectors/comparison/content')(use);
