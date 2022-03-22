import { Stepper } from '@app/components';
import { ContentTypes } from '@app/types';
import isArray from 'lodash/isArray';
import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';

import { Svg as Step1 } from './assets/Pages-Step-1.svg';
import { Svg as Step2 } from './assets/Pages-Step-2.svg';

const templates: Array<ContentTypes.Content> = [
  {
    step: 0,
    size: 6,
    image: <Step1 />
  },
  {
    step: 0,
    size: 6,
    image: <Step1 />
  },
  {
    step: 1,
    size: 12,
    image: <Step2 />
  }
];

export const ByExample: FC = () => {
  const { t } = useTranslation();

  const steps = t<Array<ContentTypes.Content>>(
    'pages/pidp/approach/by-example/index:steps',
    {},
    { returnObjects: true }
  );

  const stepsProcessed =
    isArray(steps) && steps.length > 0
      ? steps.map((step, index) => {
          return {
            ...step,
            ...templates[index]
          };
        })
      : null;

  return stepsProcessed != null && stepsProcessed.length > 0 ? (
    <Stepper.StepperContent
      elements={stepsProcessed}
      labelBack={t('common:back')}
      labelNext={t('common:next')}
    />
  ) : null;
};
