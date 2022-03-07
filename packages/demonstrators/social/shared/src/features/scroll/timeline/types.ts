import { ArcherTypes } from '@app/components';
import { EffectRef } from '@huse/effect-ref';

import { Scroll } from '../../..';

export const View = {
  Timeline: 'Timeline',
  Posts: 'Posts'
} as const;

export type TView = typeof View[keyof typeof View];

export interface Tab {
  activeTab: TView;
}

export interface RefContainerScroll {
  refObserved: EffectRef<HTMLElement>;
}

export interface Link {
  id?: string;
  nodeTranslationKey?: string;
  relationTranslationKey?: string;
}

export interface Node {
  id: string;
  label: string;
}

export interface NodeWithRelations {
  relations: Array<ArcherTypes.Relation>;
  node: Node;
}

export interface EdgeConnectionMap {
  postIds: { [key: string]: string };
  sliceIds: { [key: string]: string };
  timelineIds: { [key: string]: string };
}

export enum LAYOUT {
  FULL = 0,
  PROGRESSIVE = 1
}

export interface NodeWithRelationsWithEdge {
  nodeWithRelations: Array<NodeWithRelations>;
  edgeConnections: EdgeConnectionMap;
  ltr: boolean;
  layout: LAYOUT;
}

export interface NodesWithRelationsMap {
  nodesWithRelations: {
    [key: string]: Array<NodeWithRelationsWithEdge>;
  };
  activeId: string;
  finalSize: number;
}

export const DockPosition = {
  left: 'left',
  right: 'right'
} as const;

export type TDockPosition = typeof DockPosition[keyof typeof DockPosition];

export interface SliceMap {
  postId?: string;

  sliceId?: string;
  nodeWithRelations: Scroll.Timeline.NodeWithRelations;
}
