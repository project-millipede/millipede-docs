import isArray from 'lodash/isArray';
import { Translate } from 'next-translate';

import { Scroll } from '../../..';
import { LAYOUT, Link, NodeWithRelationsWithEdge } from './types';

export const addTopic = (
  items: Array<string>,
  topic: string,
  translationKey: string
) => {
  return items.map<Link>(item => {
    return {
      id: item,
      nodeTranslationKey: `${translationKey}${topic}-node-${item}`,
      relationTranslationKey: `${translationKey}${topic}-relation-${item}`
    };
  });
};

/**
 * This function processes recursive action plans; the data structure is kept intact.
 * Recursive action plans are not supported yet; this function is not used anywhere.
 * Supporting this kind of action plan requires a reimplementation of other functions
 * such as createNodesWithRelations
 *
 * const actionPlan: {
 *    [index: string]: Array<string | Array<string>>;
 * } = {
 *    publish: ['head', ['a', 'b'], 'tail']
 * };
 */
export const addTopicRecursive = (
  items: Array<string | Array<string>>,
  topic: string,
  translationKey: string
) => {
  const reduceFn = (
    acc: Array<Link | Array<Link>>,
    item: string | Array<string>
  ) => {
    if (isArray(item)) {
      const result = item.reduce(reduceFn, [] as Array<Link>);
      // eslint-disable-next-line no-param-reassign
      acc = [...acc, result] as Array<Link>;
    } else {
      acc.push({
        id: item,
        nodeTranslationKey: `${translationKey}${topic}-node-${item}`,
        relationTranslationKey: `${translationKey}${topic}-relation-${item}`
      });
    }
    return acc;
  };
  return items.reduce(reduceFn, [] as Array<Link>);
};

const getEdgeConnections = (
  item: Link, // from reduce, currentValue
  index: number, // from reduce, index
  length: number, // from reduce, all items length
  ids: Array<string> | string // timeline, post, or slice
) => {
  if (isArray(ids)) {
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

/**
 * The creation of nodes and their respective relation descriptors gets executed once per operation.
 *
 * A single relation descriptor includes both mandatory and optional docking information,
 * meaning the anchors can be reoriented by selecting a different layout (default - horizontal,
 * optional - vertical) without executing the method repeatedly.
 */

export const createNodesWithRelations =
  (
    definition: Array<Link>,
    t: Translate,
    ltr = true,
    layout = LAYOUT.FULL,
    resultMinusLast: Array<string>,
    flowActions: Array<Scroll.Timeline.Link>
  ) =>
  (
    timelineIds: Array<string> | string,
    postIds: Array<string> | string,
    sliceIds: Array<string> | string
  ) => {
    const reduceFn = <T extends NodeWithRelationsWithEdge>(
      acc: T,
      link: Link,
      index: number,
      links: Array<Link>
    ): T => {
      const { id, nodeTranslationKey, relationTranslationKey } = link;
      // eslint-disable-next-line no-param-reassign

      const sliceEdgeConnections = !flowActions
        .map(flowAction => flowAction.id)
        .includes(id)
        ? getEdgeConnections(link, index, links.length, sliceIds)
        : {};

      const allNodeIds = acc.nodeWithRelations.map(value => value.node.id);
      if (allNodeIds.includes(id)) {
        return acc;
      } else {
        // eslint-disable-next-line no-param-reassign
        acc = {
          ...acc,
          nodeWithRelations: [
            ...acc.nodeWithRelations,
            {
              node: {
                id,
                label: t(nodeTranslationKey)
              },

              relations:
                index !== links.length - 1
                  ? [
                      {
                        targetId: links[index + 1].id,
                        label: t(relationTranslationKey),

                        /**
                         * The source and target anchors for the east and west docking are mandatory;
                         * anchors for the north and south docking are optional.
                         */

                        sourceAnchor: ltr ? 'right' : 'left',
                        targetAnchor: ltr ? 'left' : 'right',

                        optionalSourceAnchor: resultMinusLast.includes(id)
                          ? ltr
                            ? 'bottom'
                            : 'top'
                          : undefined,

                        optionalTargetAnchor: resultMinusLast.includes(id)
                          ? ltr
                            ? 'top'
                            : 'bottom'
                          : undefined
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
              ...sliceEdgeConnections
            }
          }
        };
      }
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

    console.log('result - createNodesWithRelations: ', result);

    return result;
  };
