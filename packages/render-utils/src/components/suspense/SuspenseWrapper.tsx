import { Media, RenderUtils } from '@app/render-utils';
import React, { FC, ReactElement, Suspense, useEffect, useId, useState, useTransition } from 'react';

import { Suspender } from './Suspender';

// import { Suspension } from 'resuspend';

export interface SuspenseWrapperProps {
  media: Media;
}

/**
 * Background:
 * The feature available in React 17 for canceling out unused DOM elements got eliminated in React 18.
 * The only option for replicating the behavior is to use Suspense and selectively suspend currently
 * unused components through Suspense wrappers / Suspenders.
 *
 * In the context of the approach pursued by fresnel, a variant of a component set that matches
 * a current breakpoint renders; any unmatched component gets suspended.
 *
 * The task of the suspense wrapper component is to interrupt the suspense component
 * by necessary transition pauses.
 *
 * Important:
 * React 18 requires the use of a transition when a value enters a suspense boundary.
 * A Suspense boundary does not serve an API to suspend embedded components.
 *
 * The only way is to make a commitment to the Suspense boundary, this must be done within
 * a Suspense boundary, see component Suspender and its "active" property.
 *
 * The only way is to trigger a commitment to the suspense boundary within a suspense boundary,
 * reference component Suspender, and its "active" property.
 */
export const SuspenseWrapper: FC<
  SuspenseWrapperProps & {
    children: ReactElement;
  }
> = ({ media: { active, isPending: activeIsPending }, children }) => {
  const id = useId();

  const [, setRerenderSuspended] = useState(false);
  const [rerenderSuspendedIsPending, startRerenderSuspendedTransition] =
    useTransition();

  useEffect(() => {
    if (!active) {
      startRerenderSuspendedTransition(() => {
        setRerenderSuspended(value => !value);
      });
    }
  }, [active]);

  return (
    !activeIsPending &&
    !rerenderSuspendedIsPending && (
      <Suspense fallback={null}>
        <Suspender id={id} freeze={!RenderUtils.isBrowser() ? false : !active}>
          {children}
        </Suspender>
      </Suspense>
    )
  );
};
