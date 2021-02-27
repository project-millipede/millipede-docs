import { StringUtil } from '@app/utils';
import { Step } from '@demonstrator/components/src/player/types';
import useTranslation from 'next-translate/useTranslation';
import { forwardRef, ForwardRefRenderFunction } from 'react';

interface PlaytextProps {
  activeStep: Step;
}

// const useStyles = makeStyles((_theme: Theme) =>
//   createStyles({
//     textContainer: {
//       margin: '24px',
//       fontSize: 16,
//       fontWeight: 'bold'
//     }
//   })
// );

const Playtext: ForwardRefRenderFunction<HTMLDivElement, PlaytextProps> = (
  { activeStep },
  resizeControlRef
) => {
  // const classes = useStyles();

  const { t } = useTranslation();

  return activeStep &&
    activeStep.description &&
    !StringUtil.isEmptyString(activeStep?.description) ? (
    <div ref={resizeControlRef}>{t(activeStep?.description)}</div>
  ) : null;
};

export default forwardRef(Playtext);
