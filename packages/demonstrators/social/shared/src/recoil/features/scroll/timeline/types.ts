import { ArcherTypes } from '@app/components';
import { EffectRef } from '@huse/effect-ref';

export enum VIEW {
  TIMELINE = 0,
  POSTS = 1
}

export interface Views {
  currentViews: { [key: string]: VIEW };
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
  counter: number;
  finalSize: number;
}
