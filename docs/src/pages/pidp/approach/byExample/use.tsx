import { Stepper } from '@app/components';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Step1 from '../../../../../../src/assets/pidp/approach/byExample/Step1';
import Step2 from '../../../../../../src/assets/pidp/approach/byExample/Step2';
import { Content } from '../../../../../../src/typings/data/import';

const generateContent = (t: Translate): Array<Content> => {
  const steps = t<Array<Content>>(
    'pages/pidp/approach/byExample/content:steps',
    {},
    { returnObjects: true }
  );

  const template: Array<Content> = [
    {
      step: 0,
      size: 6,
      image: <Step1 style={{ width: '100%' }} />
    },
    {
      step: 0,
      size: 6,
      image: <Step1 style={{ width: '100%' }} />
    },
    {
      step: 1,
      size: 12,
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
  return (
    <Stepper.StepperContent
      elements={generateContent(t)}
      labelBack={t('common:back')}
      labelNext={t('common:next')}
    />
  );
};

export default use;
