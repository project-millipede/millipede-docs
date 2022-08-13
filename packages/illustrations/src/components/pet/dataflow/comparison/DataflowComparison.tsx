import { Stepper } from '@app/components';
import { ContentTypes } from '@app/types';
import { I18n } from '@app/utils';
import { FC } from 'react';

import { Svg as Step1 } from './assets/Data-Flow-Step1.svg';
import { Svg as Step2 } from './assets/Data-Flow-Step2.svg';

const templates: Array<ContentTypes.Content> = [
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

export const DataflowComparison: FC = () => {
  const { t } = I18n.useTranslation();

  const steps = t<Array<ContentTypes.Content>>(
    'pages/pet/dataflow/comparison/index:steps',
    {},
    { returnObjects: true }
  );

  const stepsProcessed =
    Array.isArray(steps) && steps.length > 0
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
