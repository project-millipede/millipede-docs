import { StringUtil } from '@app/utils';
import { FC, memo, MutableRefObject, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

import { features } from '../features';
import { useParent } from '../hooks/useParent';
import { invariant } from '../utils/invariant';
import { warning } from '../utils/warning';

import type { Fiber } from 'react-reconciler';
interface ViewProps {
  parentId: string;
  render: (
    parentId: string,
    parentRef: MutableRefObject<HTMLDivElement>
  ) => JSX.Element;
}

export const View: FC<ViewProps> = ({ parentId, render }) => {
  const {
    reparent: {
      states: { reparentState },
      actions: { addItem, removeItem, hasItem }
    }
  } = features;

  const parentRef = useRef<HTMLDivElement>(null);

  const [reparent, setReparent] = useRecoilState(reparentState);

  // const parentFiber = useParent(parentRef, (fiber: Fiber, _action: string) => {
  const parentFiber = useParent(parentRef, (fiber: Fiber) => {
    /*
    What is happening here?
    
    The function find-fiber is an intermediate function between the stages of
    removing and re-adding an element from and respectively to a container.

    The following summarizes the relationship between a fiber (parent) and its child.

    - A parent-fiber has a child-fiber before the remove operation executes.
    - The remove operation separates the child fiber from the parent fiber.
    - After the removal, but before the add operation executes, the child fiber gets stored 
      in a local variable within the send-child function.
    - The decoupled child-fiber gets reassigned to a new parent-fiber.
    */

    // TODO: Write comment about re-parent config and animation switch

    return fiber;
  });

  useEffect(() => {
    invariant(
      !StringUtil.isEmptyString(parentId),
      'You must provide an id to the <View> component.'
    );

    if (hasItem(reparent, parentId)) {
      warning(
        `It seems that a new <View> has been mounted with the id: ${parentId}, while there is another <View> with that id.`
      );
    }

    setReparent(state => addItem(state, parentId, parentFiber));

    return () => {
      setReparent(state => removeItem(state, parentId));
    };
  }, []);

  return render(parentId, parentRef);
};

export default memo(View);
