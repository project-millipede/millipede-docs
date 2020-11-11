import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Step1 from '../../../../../../src/assets/common/dataFlow/comparison/Step1';
import Step2 from '../../../../../../src/assets/common/dataFlow/comparison/Step2';
import { Content } from '../../../../../../src/typings/data/import';
import { StepperContent } from '../../../../modules/components/common/stepper';

const generateContent = (t: Translate): Array<Content> => {
  const steps: Array<Content> = t(
    'pages/common/dataflow/comparison/content:stepss',
    {},
    { returnObjects: true }
  );

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

const use = () => {
  const { t } = useTranslation();
  return <StepperContent elements={generateContent(t)} />;
};

export default use;
