import { Portal } from '@app/components';
import { StringUtil } from '@app/utils';
import { Player, useStepDispatch, useStepState } from '@demonstrator/components';
import { Step } from '@demonstrator/components/src/player/types';
import { activeViewIdSelector } from '@demonstrator/navigation';
import { useNavigation } from '@demonstrator/navigation/src/hooks/useNavigation';
import { appCompositionState } from '@demonstrator/navigation/src/recoil/features/app/reducers';
import isFunction from 'lodash/isFunction';
import dynamic from 'next/dynamic';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

interface FlowPlayControlProps {
  steps: Array<Step>;
  topic: string;
}

const Cursor = dynamic(
  () => import('@demonstrator/components').then(module => module.Cursor),
  { ssr: false }
);

export const FlowPlayControl: FC<FlowPlayControlProps> = ({ steps, topic }) => {
  return <StepsRangeWrapper topic={topic} steps={steps} />;
};

const StepsRangeWrapper: FC<FlowPlayControlProps> = ({ steps, topic }) => {
  const [{ id: activeViewElementId }] = useRecoilValue(activeViewIdSelector);

  const { target, playing, maxStepsCount } = useStepState();

  const stepDispatch = useStepDispatch();

  useEffect(() => {
    if (maxStepsCount === 0 && playing) {
      stepDispatch({ type: 'INIT', maxStepsCount: steps.length });
    }
  }, [maxStepsCount, playing, topic]);

  const { viewSelector } = steps[target] || { viewSelector: '' };

  const { selector } = steps[target] || { selector: '' };
  const { stepsWithDuration } = Player.Utils.playertime.getTimeData(steps);

  const duration = useMemo(() => {
    const { duration } =
      stepsWithDuration && stepsWithDuration.length > 0 && target >= 0
        ? stepsWithDuration[target]
        : { duration: 0 };
    return duration;
  }, [target]);

  // does the heavy lifting
  Player.Hooks.useStepsProgress(duration);

  const { isMobile: isMobileManual } = useRecoilValue(appCompositionState);

  const navigate = useNavigation();

  const handleNavigation = useCallback(
    (newActiveViewElementId: string) => {
      navigate(activeViewElementId, newActiveViewElementId);
    },
    [navigate, activeViewElementId]
  );

  useEffect(() => {
    if (
      isMobileManual &&
      playing &&
      viewSelector != null &&
      !StringUtil.isEmptyString(viewSelector as string)
    ) {
      handleNavigation(viewSelector);
    }
  }, [viewSelector]);

  useEffect(() => {
    if (selector != null && isFunction(selector)) {
      selector();
    }
  }, [selector]);

  return (
    playing && (
      <Portal.PortalIn portalType={Portal.PortalType.Cursor}>
        {playing &&
        selector != null &&
        !isFunction(selector) &&
        !StringUtil.isEmptyString(selector as string) ? (
          <Cursor selector={`#${selector}`} />
        ) : null}
      </Portal.PortalIn>
    )
  );
};
