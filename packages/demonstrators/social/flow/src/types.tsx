import { ArcherTypes } from '@app/components';
import { ScrollTypes } from '@demonstrators-social/shared';
import { RefObject } from 'react';

export interface InteractionItemPropsRoot {
  containerScroll: Partial<DOMRect>;
  timelineId: string;
  postId: string;
  archerData?:
    | ScrollTypes.Timeline.NodeWithRelations
    | Array<ScrollTypes.Timeline.NodeWithRelations>;
  offSet: number;
  render?: ArcherTypes.RenderFn;
}

export interface InteractionItemProps {
  timelineId: string;
  postId: string;
  archerData?:
    | ScrollTypes.Timeline.NodeWithRelations
    | Array<ScrollTypes.Timeline.NodeWithRelations>;
  otherTimelineId?: string;
  render?: ArcherTypes.RenderFn;
}

export type InteractionItemArcherProps = InteractionItemProps &
  ArcherTypes.ArcherElementProps;

export interface InteractionSliceProps {
  timelineId: string;
  postId: string;
  sliceId?: string;
  postBounds?: Partial<DOMRect>;
  forwardedRef?: RefObject<HTMLDivElement>;

  id?: string;
  relations?: Array<ArcherTypes.Relation>;
  dynamicRef?: any;
}

export type InteractionSliceArcherProps = InteractionSliceProps &
  ArcherTypes.ArcherElementProps;
