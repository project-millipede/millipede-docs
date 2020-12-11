import { Stepper } from '@app/components';
import { ContentTypes } from '@app/types';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Step1 from '../../../../../../src/assets/common/dataFlow/comparison/Step1';
import Step2 from '../../../../../../src/assets/common/dataFlow/comparison/Step2';

const generateContent = (t: Translate) => {
  const steps = t<Array<ContentTypes.Content>>(
    'pages/common/dataflow/comparison/content:stepss',
    {},
    { returnObjects: true }
  );

  const template: Array<ContentTypes.Content> = [
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
  return (
    <Stepper.StepperContent
      elements={generateContent(t)}
      labelBack={t('common:back')}
      labelNext={t('common:next')}
    />
  );
};

export default use;
