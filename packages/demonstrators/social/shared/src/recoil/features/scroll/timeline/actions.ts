import _ from 'lodash';
import { Translate } from 'next-translate';

import { LAYOUT, Link, NodeWithRelationsWithEdge } from './types';

export const publishActions = ['head', 'upload', 'download', 'tail'];

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

export const actions = {
  addTopic,
  createNodesWithRelations
};

export const data = {
  publishActions
};
