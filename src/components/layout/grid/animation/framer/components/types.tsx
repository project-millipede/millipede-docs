import { RefObject } from 'react';

import { ArcherElementProps, Relation, RenderFn } from '../../../../../../../docs/src/modules/components/archer/types';
import { NodeWithRelations } from '../../../../../../../docs/src/modules/recoil/features/scroll/timeline/reducer';

export interface InteractionItemPropsRoot {
  containerScroll: Partial<DOMRect>;
  timelineId: string;
  postId: string;
  archerData?: NodeWithRelations | Array<NodeWithRelations>;
  offSet: number;
  render?: RenderFn;
}

export interface InteractionItemProps {
  timelineId: string;
  postId: string;
  archerData?: NodeWithRelations | Array<NodeWithRelations>;
  otherTimelineId?: string;
  render?: RenderFn;
}

export type InteractionItemArcherProps = InteractionItemProps &
  ArcherElementProps;

export interface InteractionSliceProps {
  timelineId: string;
  postId: string;
  sliceId?: string;
  postBounds?: Partial<DOMRect>;
  forwardedRef?: RefObject<HTMLDivElement>;

  id?: string;
  relations?: Array<Relation>;
  dynamicRef?: any;
}

export type InteractionSliceArcherProps = InteractionSliceProps &
  ArcherElementProps;
