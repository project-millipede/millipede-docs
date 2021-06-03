import { StringUtil } from '@app/utils';
import { Step } from '@demonstrator/components/src/player/types';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import { forwardRef, ForwardRefRenderFunction } from 'react';

interface PlaytextProps {
  activeStep: Step;
}
const Playtext: ForwardRefRenderFunction<HTMLDivElement, PlaytextProps> = (
  { activeStep = {} },
  ref
) => {
  const { t } = useTranslation();

  const { description } = activeStep;

  return description && !StringUtil.isEmptyString(description) ? (
    <motion.div ref={ref}>{t(description)}</motion.div>
  ) : null;
};

export default forwardRef(Playtext);
