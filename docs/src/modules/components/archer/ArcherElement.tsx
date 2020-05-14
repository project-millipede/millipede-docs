import React, { cloneElement, FC, useEffect, useRef } from 'react';

import { useRefDispatch } from './context/RefProvider';
import { useTransitionDispatch } from './context/TransitionProvider';
import { ArcherElementProps, Relation, RelationType, SourceToTargetType } from './types';

const generateSourceToTarget = (
  sourceId: string,
  relations: Array<Relation>
): Array<SourceToTargetType> => {
  return relations.map(
    ({ targetId, sourceAnchor, targetAnchor, label, style }: RelationType) => ({
      source: { id: sourceId, anchor: sourceAnchor },
      target: { id: targetId, anchor: targetAnchor },
      label,
      style
    })
  );
};

export const ArcherElement: FC<ArcherElementProps> = ({
  id,
  relations,
  children
}) => {
  const refDispatch = useRefDispatch();
  const transitionDispatch = useTransitionDispatch();

  const elementRef: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);

  useEffect(() => {
    registerTransitions();
    refDispatch({ type: 'REGISTER', id, ref: elementRef });
    return () => {
      refDispatch({ type: 'UNREGISTER', id });
      transitionDispatch({ type: 'UNREGISTER', elementId: id });
    };
  }, []);

  const registerTransitions = () => {
    const sourceToTargets = generateSourceToTarget(id, relations);
    transitionDispatch({
      type: 'REGISTER',
      elementId: id,
      sourceToTargets
    });
  };

  return cloneElement(children, {
    ref: elementRef
  });
};

ArcherElement.defaultProps = {
  relations: []
};
