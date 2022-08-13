import { CollectionUtil } from '@app/utils';

import { Scroll } from '../../..';

export const getDockedPostIds = (
  timelineId: string,
  position: Scroll.Timeline.TDockPosition,
  nodeWithRelationsWithEdgeMap: Scroll.Timeline.NodesWithRelationsMap
) => {
  const { nodesWithRelations, finalSize } = nodeWithRelationsWithEdgeMap;

  return Object.values(nodesWithRelations)
    .flat()
    .reduce<Array<string>>((acc, value) => {
      const {
        ltr,
        nodeWithRelations,
        edgeConnections: { timelineIds, postIds }
      } = value;

      const allNodeIds = nodeWithRelations.map(({ node: { id } }) => id);

      const [headRelationId] = allNodeIds;
      const [tailRelationId] = allNodeIds.slice(-1);

      const timelineIdWithHeadDock = timelineIds?.[headRelationId];
      const timelineIdWithTailDock = timelineIds?.[tailRelationId];

      if (ltr) {
        if (
          position === Scroll.Timeline.DockPosition.Left &&
          allNodeIds.length >= 1
        ) {
          if (timelineId === timelineIdWithHeadDock) {
            const postId = postIds?.[headRelationId];
            return !acc.includes(postId) ? [...acc, postId] : acc;
          }
        }
        if (
          position === Scroll.Timeline.DockPosition.Right &&
          allNodeIds.length === finalSize
        ) {
          if (timelineId === timelineIdWithTailDock) {
            const postId = postIds?.[tailRelationId];
            return !acc.includes(postId) ? [...acc, postId] : acc;
          }
        }
      }
      if (!ltr) {
        if (
          position === Scroll.Timeline.DockPosition.Left &&
          allNodeIds.length === finalSize
        ) {
          if (timelineId === timelineIdWithHeadDock) {
            const postId = postIds?.[headRelationId];
            return !acc.includes(postId) ? [...acc, postId] : acc;
          }
        }
        if (
          position === Scroll.Timeline.DockPosition.Right &&
          allNodeIds.length >= 1
        ) {
          if (timelineId === timelineIdWithTailDock) {
            const postId = postIds?.[tailRelationId];
            return !acc.includes(postId) ? [...acc, postId] : acc;
          }
        }
      }

      // This is the reduced version, identical to the above
      // if (
      //   position === Scroll.Timeline.DockPosition.Left && ltr
      //     ? allNodeIds.length >= 1
      //     : allNodeIds.length === finalSize
      // ) {
      //   if (timelineId === timelineIdWithHeadDock) {
      //     const postId = postIds?.[headRelationId];
      //     return !acc.includes(postId) ? [...acc, postId] : acc;
      //   }
      // }
      // if (
      //   position === Scroll.Timeline.DockPosition.Right && ltr
      //     ? allNodeIds.length === finalSize
      //     : allNodeIds.length >= 1
      // ) {
      //   if (timelineId === timelineIdWithTailDock) {
      //     const postId = postIds?.[tailRelationId]);
      //     return !acc.includes(postId) ? [...acc, postId] : acc;
      //   }
      // }

      return acc;
    }, []);
};

export const getDockedSliceIds = (
  timelineId: string,
  postId: string,
  nodeWithRelationsWithEdgeMap: Scroll.Timeline.NodesWithRelationsMap
) => {
  const { nodesWithRelations } = nodeWithRelationsWithEdgeMap;

  const activeNodesWithRelations =
    nodesWithRelations?.[postId] ??
    ([] as Array<Scroll.Timeline.NodeWithRelationsWithEdge>);

  const intermediateResult =
    activeNodesWithRelations.map<Scroll.Timeline.SliceMap>(
      nodeWithRelationsWithEdge => {
        const {
          nodeWithRelations,
          edgeConnections: { timelineIds, sliceIds }
        } = nodeWithRelationsWithEdge;

        const allNodeIds = nodeWithRelations.map(({ node: { id } }) => id);

        const [headRelationId] = allNodeIds;
        const [tailRelationId] = allNodeIds.slice(-1);

        const timelineIdWithHeadDock = timelineIds?.[headRelationId];
        const timelineIdWithTailDock = timelineIds?.[tailRelationId];

        if (timelineId === timelineIdWithHeadDock) {
          return {
            sliceId: sliceIds?.[headRelationId],
            nodeWithRelations: nodeWithRelations.find(
              nodeWithRelation => nodeWithRelation.node.id === headRelationId
            )
          };
        }

        if (timelineId === timelineIdWithTailDock) {
          return {
            sliceId: sliceIds?.[tailRelationId],
            nodeWithRelations: nodeWithRelations.find(
              nodeWithRelation => nodeWithRelation.node.id === tailRelationId
            )
          };
        }
      }
    );

  /**
   * Filtering out duplicate entries is mandatory.
   *
   * One of the steps preceding the rendering phase requires the processing of slice blocks.
   * Duplicates in the result are caused by identically named entries, at the same index,
   * see the following slice block constellation.
   *
   * const sliceIdBlocks: Array<Scroll.Interaction.TSliceVariant | Array<Scroll.Interaction.TSliceVariant>> = [
   *    ['media', 'comments'],
   *    ['sentiment', 'comments']
   * ];
   *
   * Identical values of the result set, in this case two identical comment nodes must be considered "equal";
   * eventually the data structure is passed to React, which rejects different elements with equal keys.
   */

  return intermediateResult.reduce<Array<Scroll.Timeline.SliceMap>>(
    (acc, value) => {
      const allSliceIds = acc.map(value => value.sliceId);
      if (allSliceIds.includes(value.sliceId)) {
        return acc;
      } else {
        return [...acc, value];
      }
    },
    []
  );
};

/**
 * This function is an alternative to the upper one.
 *
 * Instead of Array.map, Array.reduce is used. An essential difference
 * is directed to the avoidance of duplicates.
 *
 * In the present version, unlike above, this is not done afterwards,
 * but by checking whether an entry already exists in the accumulator.
 */

export const getDockedSliceIdsWithReduce = (
  timelineId: string,
  postId: string,
  nodeWithRelationsWithEdgeMap: Scroll.Timeline.NodesWithRelationsMap
) => {
  const { nodesWithRelations } = nodeWithRelationsWithEdgeMap;

  const activeNodesWithRelations =
    nodesWithRelations?.[postId] ??
    ([] as Array<Scroll.Timeline.NodeWithRelationsWithEdge>);

  return activeNodesWithRelations.reduce<Array<Scroll.Timeline.SliceMap>>(
    (acc, nodeWithRelationsWithEdge) => {
      const {
        nodeWithRelations,
        edgeConnections: { timelineIds, sliceIds }
      } = nodeWithRelationsWithEdge;

      const allNodeIds = nodeWithRelations.map(({ node: { id } }) => id);

      const [headRelationId] = allNodeIds;
      const [tailRelationId] = allNodeIds.slice(-1);

      const timelineIdWithHeadDock = timelineIds?.[headRelationId];
      const timelineIdWithTailDock = timelineIds?.[tailRelationId];

      if (timelineId === timelineIdWithHeadDock) {
        const allSliceIds = acc.map(value => value.sliceId);
        const potentialSliceId = sliceIds?.[headRelationId];

        // eslint-disable-next-line no-param-reassign
        acc = !allSliceIds.includes(potentialSliceId)
          ? [
              ...acc,
              {
                sliceId: potentialSliceId,
                nodeWithRelations: nodeWithRelations.find(
                  nodeWithRelation =>
                    nodeWithRelation.node.id === headRelationId
                )
              }
            ]
          : acc;
      }

      if (timelineId === timelineIdWithTailDock) {
        /**
         * Note:
         * A new determination of all slice ids known to the accumulator is
         * necessary because an object with an identical slice id may already
         * have been added to the accumulator in the upper section.
         */

        const allSliceIds = acc.map(value => value.sliceId);
        const potentialSliceId = sliceIds?.[tailRelationId];

        // eslint-disable-next-line no-param-reassign
        acc = !allSliceIds.includes(potentialSliceId)
          ? [
              ...acc,
              {
                sliceId: potentialSliceId,
                nodeWithRelations: nodeWithRelations.find(
                  nodeWithRelation =>
                    nodeWithRelation.node.id === tailRelationId
                )
              }
            ]
          : acc;
      }
      return acc;
    },
    []
  );
};

export const getBodySliceIds = (
  nodeWithRelationsWithEdgeMap: Scroll.Timeline.NodesWithRelationsMap
) => {
  const { nodesWithRelations, finalSize } = nodeWithRelationsWithEdgeMap;
  return Object.values(nodesWithRelations)
    .flat()
    .map(value => {
      const { ltr, nodeWithRelations } = value;
      return CollectionUtil.Array.withoutBorders<Scroll.Timeline.NodeWithRelations>(
        nodeWithRelations,
        finalSize,
        ltr
      );
    });
};
