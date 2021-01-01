import { ArcherTypes } from '@app/components';
import { ScrollTypes } from '@demonstrators-social/shared';
import { RefObject } from 'react';

export interface DockItemPropsRoot {
  containerScroll: Partial<DOMRect>;
  timelineId: string;
  postId: string;
  archerData?:
    | ScrollTypes.Timeline.NodeWithRelations
    | Array<ScrollTypes.Timeline.NodeWithRelations>;
  offSet: number;
  render?: ArcherTypes.RenderFn;
}

export interface DockItemProps {
  timelineId: string;
  postId: string;
  archerData?:
    | ScrollTypes.Timeline.NodeWithRelations
    | Array<ScrollTypes.Timeline.NodeWithRelations>;
  otherTimelineId?: string;
  render?: ArcherTypes.RenderFn;
  isInteractive?: boolean;
}

export type DockItemArcherProps = DockItemProps &
  ArcherTypes.ArcherElementProps;

export interface DockSliceProps {
  timelineId: string;
  postId: string;
  sliceId?: string;
  postBounds?: Partial<DOMRect>;
  forwardedRef?: RefObject<HTMLDivElement>;

  id?: string;
  relations?: Array<ArcherTypes.Relation>;
  dynamicRef?: any;
  isInteractive?: boolean;
}

export type DockSliceArcherProps = DockSliceProps &
  ArcherTypes.ArcherElementProps;
