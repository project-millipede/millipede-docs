import { TFunction } from 'next-i18next';
import React from 'react';

import { useTranslation } from '../../../../../../i18n';
import Step1 from '../../../../../../src/assets/common/dataFlow/comparison/Step1';
import Step2 from '../../../../../../src/assets/common/dataFlow/comparison/Step2';
import { Content } from '../../../../../../src/typings/data/import';
import { StepperContent } from '../../../../modules/components/common/stepper';

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

const ns = 'pages/common/dataflow/comparison/content';

const use = () => {
  const { t } = useTranslation(ns);
  return <StepperContent elements={generateContent(t)} />;
};

export default use;
