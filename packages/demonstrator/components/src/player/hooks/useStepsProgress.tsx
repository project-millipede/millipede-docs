import { useInterval } from '../../hooks';
import { useStepDispatch, useStepState } from '../context';

export const useStepsProgress = (delay: number) => {
  const { playing, target, maxStepsCount } = useStepState();
  const stepDispatch = useStepDispatch();

  useInterval(
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
