import { HooksUtils } from '@app/render-utils';

import { useStepDispatch, useStepState } from '../context';

export const useStepsProgress = (delay: number) => {
  const { playing, target, maxStepsCount } = useStepState();
  const stepDispatch = useStepDispatch();

  HooksUtils.useInterval(
    () => {
      if (target === maxStepsCount - 1) {
        stepDispatch({ type: 'RESET' });
        return;
      }
      if (playing) {
        stepDispatch({ type: 'AUTO' });
      }
    },
    playing ? delay : 0
  );
};
