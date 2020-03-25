import { TFunction } from 'next-i18next-serverless';
import React from 'react';

import { useTranslation } from '../../../../../../i18n';
import { Content } from '../../../../../../src/typings/data/import';
import { StepperContent } from '../../../../modules/components/common/stepper';
import { FunctionBeahvior, HookedFunctionBeahvior } from './methodHooking';

const generateContent = (t: TFunction): Array<Content> => {
  const steps: Array<Content> = t('steps', { returnObjects: true });

  const template: Array<Content> = [
    {
      step: 0,
      size: 12,
      image: <FunctionBeahvior />
    },
    {
      step: 1,
      size: 12,
      image: <HookedFunctionBeahvior />
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

const ns = 'pages/ai/index';

const use = () => {
  const { t } = useTranslation(ns);
  return <StepperContent elements={generateContent(t)} />;
};

export default use;
