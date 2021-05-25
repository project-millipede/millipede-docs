import { isEmptyString } from '@app/utils/src/string';
import { motion, MotionProps, SharedLayoutContext, SharedLayoutSyncMethods } from 'framer-motion';
import React, { FC, ReactNode, useContext, useEffect, useRef } from 'react';
import ReactReconciler from 'react-reconciler';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { useParent } from '../hooks/useParent';
import { reparentReducer, reparentState } from '../recoil/features/reparent/reducers';
import { TPosition } from '../types';
import { invariant } from '../utils/invariant';
import { warning } from '../utils/warning';

type OuterViewProps = {
  backgroundColor?: string;
  gridArea: string;
} & MotionProps;

export const OuterView = styled(motion.div)<OuterViewProps>`
  grid-area: ${({ gridArea }) => gridArea};
  width: 100%;
  height: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

interface ViewProps {
  parentId: string;
  backgroundColor: string;
  position?: TPosition;
  // children: ReactElement;
  children: ReactNode; // not ReactNode,
}

export const View: FC<ViewProps> = ({
  parentId,
  position,
  backgroundColor,
  children
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const context = useContext<SharedLayoutSyncMethods>(
    SharedLayoutContext as any
  );

  const parent = useParent(ref, (fiber: ReactReconciler.Fiber) => {
    if (fiber.child != null) {
      context.syncUpdate();
    }
    return fiber;
  });

  const [reparent, setReparent] = useRecoilState(reparentState);

  const { addItem, removeItem, hasItem } = reparentReducer;

  useEffect(() => {
    invariant(
      !isEmptyString(parentId),
      'You must provide an id to the <View> component.'
    );

    if (hasItem(reparent, parentId)) {
      warning(
        `It seems that a new <View> has been mounted with the id: ${parentId}, while there is another <View> with that id.`
      );
    }

    setReparent(state => addItem(state, parentId, parent));

    return () => {
      setReparent(state => removeItem(state, parentId));
    };
  }, []);

  return (
    <OuterView
      key={parentId}
      gridArea={position}
      backgroundColor={backgroundColor}
      ref={ref}
      // For layout props (layout or layoutId) framer-motion calculates transformation of origin.
      // To overrule or compensate those measures in an outer component we set originX -Y and -Z to 0.
      layout='position' // not necessary needed
      layoutId={parentId}
      // initial={{
      //   originY: 0,
      //   originX: 0,
      //   originZ: 0
      // }}
    >
      {children}
    </OuterView>
  );
};
