import { Stepper } from '@app/components';
import { ContentTypes } from '@app/types';
import { I18n } from '@app/utils';
import { FC } from 'react';

import { FunctionBeahvior } from './components/FunctionBeahvior';
import { FunctionBeahviorHook } from './components/FunctionBeahviorHook';

const templates: Array<ContentTypes.Content> = [
  {
    step: 0,
    size: 12,
    image: <FunctionBeahvior />
  },
  {
    step: 1,
    size: 12,
    image: <FunctionBeahviorHook />
  }
];

export const MethodHooking: FC = () => {
  const { t } = I18n.useTranslation('pages/ai/index');

  const steps = t<Array<ContentTypes.Content>>(
    'steps',
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
