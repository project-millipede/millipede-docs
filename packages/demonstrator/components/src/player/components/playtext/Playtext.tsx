import { StringUtil } from '@app/utils';
import { Step } from '@demonstrator/components/src/player/types';
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
    <div ref={ref}>{t(description)}</div>
  ) : null;
};

export default forwardRef(Playtext);
