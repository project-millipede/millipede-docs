import i18next from 'i18next';
import React from 'react';
import { WithTranslation } from 'react-i18next';

import { withTranslation } from '../../../../../../i18n';
import Step1 from '../../../../../../src/assets/common/dataFlow/comparison/Step1';
import Step2 from '../../../../../../src/assets/common/dataFlow/comparison/Step2';
import Component, { ContentItem } from './component';

const generateContent = (t: i18next.TFunction): Array<ContentItem> => {
  const steps: Array<Partial<ContentItem>> = t('stepss', { returnObjects: true });

  const template: Array<Partial<ContentItem>> = [
    {
      composition: {
        step: 0,
        gridSize: 4
      },
      image: <Step1 style={{ width: '100%' }} />
    },
    {
      composition: {
        step: 0,
        gridSize: 4
      },
      image: <Step1 style={{ width: '100%' }} />
    },
    {
      composition: {
        step: 0,
        gridSize: 4
      },
      image: <Step1 style={{ width: '100%' }} />
    },
    {
      composition: {
        step: 1,
        gridSize: 4
      },
      image: <Step2 style={{ width: '100%' }} />
    },
    {
      composition: {
        step: 2,
        gridSize: 4
      },
      image: <Step2 style={{ width: '100%' }} />
    },
    {
      composition: {
        step: 2,
        gridSize: 4
      },
      image: <Step2 style={{ width: '100%' }} />
    }
  ];

  console.log('steps', steps);

  return template.map((templateItem, index) => {
    return {
      ...templateItem,
      title: steps[index].title,
      description: steps[index].description
    } as ContentItem;
  });
};

type Props = WithTranslation;

const use = ({ t }: Props) => {
  return <Component content={{ elements: generateContent(t) }} />;
};

use.getInitialProps = async () => {
  return {
    namespacesRequired: ['pages/common/dataflow/comparison/content']
  };
};

export default withTranslation('pages/common/dataflow/comparison/content')(use);
