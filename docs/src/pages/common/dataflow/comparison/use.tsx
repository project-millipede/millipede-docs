import { TFunction } from 'next-i18next-serverless';
import React from 'react';
import { WithTranslation } from 'react-i18next';

import { withTranslation } from '../../../../../../i18n';
import Step1 from '../../../../../../src/assets/common/dataFlow/comparison/Step1';
import Step2 from '../../../../../../src/assets/common/dataFlow/comparison/Step2';
import { Content } from '../../../../../../src/typings/data/import';
import Component from './component';

const generateContent = (t: TFunction): Array<Content> => {
  const steps: Array<Content> = t('stepss', { returnObjects: true });

  const template: Array<Content> = [
    {
      step: 0,
      size: 4,
      image: <Step1 style={{ width: '100%' }} />
    },
    {
      step: 0,
      size: 4,
      image: <Step1 style={{ width: '100%' }} />
    },
    {
      step: 0,
      size: 4,
      image: <Step1 style={{ width: '100%' }} />
    },
    {
      step: 1,
      size: 12,
      image: <Step2 style={{ width: '100%' }} />
    },
    {
      step: 2,
      size: 6,
      image: <Step2 style={{ width: '100%' }} />
    },
    {
      step: 2,
      size: 6,
      image: <Step2 style={{ width: '100%' }} />
    }
  ];

  return template.map((templateItem, index) => {
    return {
      ...templateItem,
      title: steps[index].title,
      description: steps[index].description
    };
  });
};

type Props = WithTranslation;

const use = ({ t }: Props) => {
  return <Component elements={generateContent(t)} />;
};

use.getInitialProps = async () => {
  return {
    namespacesRequired: ['pages/common/dataflow/comparison/content']
  };
};

export default withTranslation('pages/common/dataflow/comparison/content')(use);
