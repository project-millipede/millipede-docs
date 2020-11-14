import { EffectRef } from '@huse/effect-ref';
import _ from 'lodash';
import { Translate } from 'next-translate';
import { atom, atomFamily } from 'recoil';

import { Relation } from '../../../../components/archer/types';
import { CollectionUtil } from '../../../../utils';

export enum VIEW {
  TIMELINE = 0,
  POSTS = 1
}

export interface Views {
  currentViews: { [key: string]: VIEW };
}

export const timelineViewState = atom<Views>({
  key: 'timelineView',
  default: {
    currentViews: {}
  }
});

export interface RefContainerScroll {
  refObserved: EffectRef<HTMLElement>;
}

export const refContainerScrollState = atomFamily<RefContainerScroll, string>({
  key: 'refContainerScroll',
  default: {
    refObserved: null
  }
});

const updateObservedItem = (
  state: RefContainerScroll,
  value: EffectRef<HTMLElement>
): RefContainerScroll => {
  return {
    ...state,
    refObserved: value
  };
};

const removeObservedItem = (state: RefContainerScroll): RefContainerScroll => {
  const refObservedUpdated = CollectionUtil.Object.removePropertyFromObject(
    state,
    'refObserved'
  );
  return {
    ...refObservedUpdated
  };
};

export const scrollTimelineReducer = {
  updateObservedItem,
  removeObservedItem
};

export const refContainerScrollFromArcherState = atomFamily<
  RefContainerScroll,
  string
>({
  key: 'refContainerScrollFromArcher',
  default: {
    refObserved: null
  }
});

// Node and Relation
// => publish (fixed)>-node-<(fixed) head
// => publish (fixed)>-relation-<(fixed) head

export const publishActions = ['head', 'upload', 'download', 'tail'];
export const publishActions2 = ['headB', 'uploadB', 'downloadB', 'tailB'];

export const baseActions = ['head', 'tail'];

type Link = {
  id: string;
  nodeValue: string;
  value: string;
};

// => publish (fixed)>-node-<(fixed) head
// => publish (fixed)>-relation-<(fixed) head

export const addTopic = (
  items: Array<string>,
  topic: string,
  translationKey: string
) => {
  return items.reduce<Array<Link>>((acc, item) => {
    acc.push({
      id: `${topic}-nodeId-${item}`,
      nodeValue: `${translationKey}${topic}-node-${item}`,
      value: `${translationKey}${topic}-relation-${item}`
    });
    return acc;
  }, []);
};

export interface Node {
  id: string;
  label: string;
}

export interface NodeWithRelations {
  relations: Array<Relation>;
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

// TODO: find ideal name
export interface A {
  values: Array<NodeWithRelationsWithEdge>;
  id: string;
  description: string;
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

export const nodesWithRelationsWithEdgeState = atom<NodesWithRelationsMap>({
  key: 'nodesWithRelationsWithEdge',
  default: {
    nodesWithRelations: {},
    activeId: '',
    counter: 0,
    finalSize: 0
  }
});

const getEdgeConnections = (
  item: Link,
  index: number,
  length: number,
  ids: Array<string> | string
) => {
  if (_.isArray(ids)) {
    // Covers scenario - e.g. the progressive scenario has only a single element at the beginning of the animmation sequence
    if (length === 1) {
      const [headId] = ids;
      return {
        ...(index === 0 && {
          [item.id]: headId
        })
      };
    }
    const [headId, tailId] = ids;
    return {
      ...(index === 0 && {
        [item.id]: headId
      }),
      ...(index === length - 1 && {
        [item.id]: tailId
      })
    };
  }

  return {
    ...((index === 0 || index === length - 1) && {
      [item.id]: ids
    })
  };
};

export const createNodesWithRelations = (
  definition: Array<Link>,
  t: Translate,
  ltr = true,
  layout = LAYOUT.FULL
) => (
  timelineIds?: Array<string> | string,
  postIds?: Array<string> | string,
  sliceIds?: Array<string> | string
) => {
  const reduceFn = <T extends NodeWithRelationsWithEdge>(
    acc: T,
    link: Link,
    index: number,
    links: Array<Link>
  ): T => {
    // eslint-disable-next-line no-param-reassign
    acc = {
      ...acc,
      nodeWithRelations: [
        ...acc.nodeWithRelations,
        {
          node: {
            id: link.id,
            label: t(link.nodeValue)
          },

          relations:
            index !== links.length - 1
              ? [
                  {
                    targetId: `${links[index + 1].id}`,
                    sourceAnchor: ltr ? 'right' : 'left',
                    targetAnchor: ltr ? 'left' : 'right',
                    label: t(link.value)
                  }
                ]
              : []
        }
      ],
      edgeConnections: {
        ...acc.edgeConnections,
        timelineIds: {
          ...acc.edgeConnections.timelineIds,
          ...getEdgeConnections(link, index, links.length, timelineIds)
        },
        postIds: {
          ...acc.edgeConnections.postIds,
          ...getEdgeConnections(link, index, links.length, postIds)
        },
        sliceIds: {
          ...acc.edgeConnections.sliceIds,
          ...getEdgeConnections(link, index, links.length, sliceIds)
        }
      }
    };
    return acc;
  };

  const result = ltr
    ? definition.reduce<NodeWithRelationsWithEdge>(reduceFn, {
        nodeWithRelations: [],
        edgeConnections: { postIds: {}, sliceIds: {}, timelineIds: {} },
        ltr,
        layout
      })
    : definition.reduceRight<NodeWithRelationsWithEdge>(reduceFn, {
        nodeWithRelations: [],
        edgeConnections: { postIds: {}, sliceIds: {}, timelineIds: {} },
        ltr,
        layout
      });
  return result;
};
