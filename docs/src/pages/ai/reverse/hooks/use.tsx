import { Stepper } from '@app/components';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { Content } from '../../../../../../src/typings/data/import';
import { FunctionBeahvior, HookedFunctionBeahvior } from './methodHooking';

const generateContent = (t: Translate) => {
  const steps = t<Array<Content>>(
    'pages/ai/index:steps',
    {},
    {
      returnObjects: true
    }
  );

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

const use = () => {
  const { t } = useTranslation();
  return <Stepper.StepperContent elements={generateContent(t)} />;
};

export default use;
