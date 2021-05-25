import { ArcherTypes } from '@app/components';
import { EffectRef } from '@huse/effect-ref';

export const View = {
  TIMELINE: 'TIMELINE',
  POSTS: 'POSTS'
} as const;

export type TView = typeof View[keyof typeof View];
export interface Tab {
  activeTab: TView;
}

export interface RefContainerScroll {
  refObserved: EffectRef<HTMLElement>;
}

export interface Link {
  id: string;
  nodeValue: string;
  value: string;
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
    [key: string]: {
      values: Array<NodeWithRelationsWithEdge>;
      id: string;
      description: string;
    };
  };
  activeId: string;
  finalSize: number;
}
