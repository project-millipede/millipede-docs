import { Typography } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { forwardRef, ForwardRefRenderFunction } from 'react';

import { AnimateHeight } from '../../../animation/components/AnimateHeight';
import { HeightVariants } from '../../../animation/types';
import { useStepState } from '../../context/StepProvider';
import { Step } from '../../types';

interface PlaytextProps {
  steps: Array<Step>;
}
export const Playtext: ForwardRefRenderFunction<
  HTMLDivElement,
  PlaytextProps
> = ({ steps }, _ref) => {
  const { t } = useTranslation();

  const { target } = useStepState();
  const activeStep = steps[target] || { description: '' };

  const { description } = activeStep;

  return (
    <AnimateHeight
      isVisible={activeStep.description != null}
      variantsType={HeightVariants.Dynamic}
    >
      <Typography variant='body1'>{t(description)}</Typography>
    </AnimateHeight>
  );
};

export default forwardRef(Playtext);
