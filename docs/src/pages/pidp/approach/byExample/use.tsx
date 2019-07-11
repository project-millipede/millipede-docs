import i18next from 'i18next';
import React from 'react';
import { WithTranslation } from 'react-i18next';

import { withTranslation } from '../../../../../../i18n';
import Step1 from '../../../../../../src/assets/pidp/approach/byExample/Step1';
import Step2 from '../../../../../../src/assets/pidp/approach/byExample/Step2';
import Component, { ContentItem } from './component';

const generateContent = (t: i18next.TFunction): Array<ContentItem> => {
  const steps: Array<Partial<ContentItem>> = t('steps', { returnObjects: true });

  const template: Array<Partial<ContentItem>> = [
    {
      composition: {
        step: 0,
        gridSize: 5
      },
      image: <Step1 style={{ width: '100%' }} />
    },
    {
      composition: {
        step: 0,
        gridSize: 5
      },
      image: <Step1 style={{ width: '100%' }} />
    },
    {
      composition: {
        step: 1,
        gridSize: 10
      },
      image: <Step2 style={{ width: '100%' }} />
    }
  ];

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
    namespacesRequired: ['pages/pidp/approach/byExample/content']
  };
};

export default withTranslation('pages/pidp/approach/byExample/content')(use);
