import { MutableRefObject, useEffect, useRef } from 'react';
import { getFiberFromElementInstance, ParentFiber } from 'react-reparenting';

import { invariant } from '../utils/invariant';

import type { Fiber } from 'react-reconciler';
/**
 * An hook to get a ParentFiber instance in a function component.
 * The ref returned must reference the element that is the parent
 * of the children to reparent (it is possible to get around this by
 * providing a findFiber method).
 *
 * @param findFiber - Get a different parent fiber.
 * @returns - The ParentFiber instance.
 */

export function useParent<T extends Node>(
  ref: MutableRefObject<T>,
  findFiber?: (fiber: Fiber) => Fiber
): MutableRefObject<ParentFiber> {
  // The reference of the parent fiber instance.
  const parentRef = useRef<ParentFiber | null>(null);

  // Generate the parent fiber instance.
  if (parentRef.current === null) {
    parentRef.current = new ParentFiber();
  }

  const parent = parentRef.current;
  parent.setFinder(findFiber);

  // When the component is mounted the fiber is set.
  useEffect(() => {
    invariant(
      ref.current !== null && ref.current !== undefined,
      'You must set the ref returned by the useParent hook.'
    );

    // The element fiber.
    parent.setFiber(getFiberFromElementInstance<T>(ref.current));

    // Clean up.
    return (): void => {
      parent.clear();
    };
  }, []);

  return parentRef;
}
