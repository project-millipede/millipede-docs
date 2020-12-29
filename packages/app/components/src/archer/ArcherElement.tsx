import { cloneElement, CSSProperties, FC, ReactElement, useEffect, useRef } from 'react';

import { useRefDispatch } from './context/RefProvider';
import { useTransitionDispatch } from './context/TransitionProvider';
import { Relation, RenderFn, SelectHandles } from './types';
import { RelationType, SourceToTargetType } from './types-private';

// import { ArcherElementProps } from './types';

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

// replicate the interface here, otherwise we get an export warning
export interface ArcherElementProps {
  /**
   * The id that will identify the Archer Element. Should only contain alphanumeric characters and standard characters that you can find in HTML ids.
   */
  id: string;
  relations?: Array<Relation>;
  style?: CSSProperties;
  children?: ReactElement;
  render?: RenderFn;
}

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
