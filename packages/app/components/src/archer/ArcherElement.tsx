import { Components as RenderComponents } from '@app/render-utils';
import { features as navigationFeatures } from '@demonstrator/navigation';
import { cloneElement, FC, useEffect, useRef } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { features } from '../features';
import { ArcherElementProps, Relation, SyncHandle } from './types';
import { SourceToTargetType } from './types-private';

const generateSourceToTarget = (
  sourceId: string,
  relations: Array<Relation>,
  isMobile: boolean,
  isMobileResponsive: boolean
): Array<SourceToTargetType> => {
  return relations.map(
    ({
      targetId,
      sourceAnchor,
      targetAnchor,
      optionalSourceAnchor,
      optionalTargetAnchor,
      label,
      style
    }) => {
      return {
        source: {
          id: sourceId,
          anchor:
            (!isMobile || isMobileResponsive) && optionalSourceAnchor != null
              ? optionalSourceAnchor
              : sourceAnchor
        },
        target: {
          id: targetId,
          anchor:
            (!isMobile || isMobileResponsive) && optionalTargetAnchor != null
              ? optionalTargetAnchor
              : targetAnchor
        },
        label,
        style
      };
    }
  );
};

const {
  Responsive: { isMobile: responsiveIsMobile }
} = RenderComponents;

export const ArcherElement: FC<ArcherElementProps> = ({
  id,
  relations = [],
  children,
  render,
  isInteractive = false
}) => {
  const {
    archer: {
      selector: { archerRefSelector, archerTransitionSelector }
    }
  } = features;

  const {
    app: {
      states: { appCompositionState }
    }
  } = navigationFeatures;

  const { isMobile } = useRecoilValue(appCompositionState);

  const isMobileResponsive = responsiveIsMobile();

  const setArcherRef = useSetRecoilState(archerRefSelector(id));
  const setArcherTransition = useSetRecoilState(archerTransitionSelector(id));

  const resetArcherRef = useResetRecoilState(archerRefSelector(id));
  const resetArcherTransition = useResetRecoilState(
    archerTransitionSelector(id)
  );

  const ref = useRef<HTMLElement>(null);
  const dynamicRef = useRef<SyncHandle>(null);

  useEffect(() => {
    setArcherRef({ ref, dynamicRef });
    const sourceToTargetsMap = generateSourceToTarget(
      id,
      relations,
      isMobile,
      isMobileResponsive
    );
    setArcherTransition({ sourceToTargetsMap });
    return () => {
      resetArcherRef();
      resetArcherTransition();
    };
  }, [id, relations, isMobile, isMobileResponsive]);

  /**
   * Warning:
   * Specifying dynamicRef.current as a dependency adds overhead.
   * The dynamicRef gets repeatedly set; this is required when a slice item
   * is the target of several arrowheads; otherwise, an update is not required.
   * For simplicity reasons, we skip the use case for now.
   *
   * useEffect(() => {
   *    setArcherRef(state => {
   *       return { ...state, dynamicRef };
   *    });
   * }, [dynamicRef.current]);
   */

  if (render != null) {
    if (isInteractive) {
      return render({ ref, dynamicRef });
    }
    return render({ ref });
  }
  if (isInteractive) {
    return cloneElement(children, {
      ref,
      dynamicRef
    });
  }
  return cloneElement(children, {
    ref
  });
};
