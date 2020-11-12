import { cloneElement, FC, useEffect, useRef } from 'react';

import { useRefDispatch } from './context/RefProvider';
import { useTransitionDispatch } from './context/TransitionProvider';
import { SelectHandles } from './CustomBoxForward';
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
  relations = [],
  children,
  render
}) => {
  const refDispatch = useRefDispatch();
  const transitionDispatch = useTransitionDispatch();

  const ref = useRef<HTMLElement>(null);
  const dynamicRef = useRef<SelectHandles>(null);

  useEffect(() => {
    const sourceToTargets = generateSourceToTarget(id, relations);
    transitionDispatch({ type: 'REGISTER', id, sourceToTargets });
    refDispatch({ type: 'REGISTER', id, ref, dynamicRef });
  }, [id, relations]);

  useEffect(() => {
    return () => {
      refDispatch({ type: 'UNREGISTER', id });
      transitionDispatch({ type: 'UNREGISTER', id });
    };
  }, []);

  if (render != null) {
    return render({ ref, dynamicRef });
  }
  return cloneElement(children, {
    ref,
    dynamicRef
  });
};
