import { CollectionUtil } from '@app/utils';
import { ScrollTypes } from '@demonstrators-social/shared';
import get from 'lodash/get';

export const DockPosition = {
  left: 'left',
  right: 'right'
} as const;

export type TDockPosition = typeof DockPosition[keyof typeof DockPosition];

const removeEmptyElementsFn = (element: any) => {
  return ![null, undefined].includes(element);
};

export const getSelectedPostIds = (
  timelineId: string,
  nodeWithRelationsWithEdgeMap: ScrollTypes.Timeline.NodesWithRelationsMap,
  position: TDockPosition
) => {
  const { activeId, nodesWithRelations, finalSize } =
    nodeWithRelationsWithEdgeMap;

  const nodeWithRelationsWithEdge = get(nodesWithRelations, activeId, {
    values: [] as Array<ScrollTypes.Timeline.NodeWithRelationsWithEdge>
  });

  const { values } = nodeWithRelationsWithEdge;

  const result = values
    .map(value => {
      const {
        nodeWithRelations,
        edgeConnections: { timelineIds, postIds },
        ltr,
        layout
      } = value;

      const allNodeIds = nodeWithRelations.map(nodeWithRelation => {
        const {
          node: { id }
        } = nodeWithRelation;
        return id;
      });

      const [headRelation] = allNodeIds;
      const [tailRelation] = CollectionUtil.Array.reverse(allNodeIds);

      if (layout === ScrollTypes.Timeline.LAYOUT.PROGRESSIVE) {
        if (ltr) {
          if (position === DockPosition.left && allNodeIds.length >= 0) {
            if (timelineId === get(timelineIds, headRelation)) {
              return get(postIds, headRelation);
            }
          }
          if (
            position === DockPosition.right &&
            allNodeIds.length === finalSize
          ) {
            if (timelineId === get(timelineIds, tailRelation)) {
              return get(postIds, tailRelation);
            }
          }
        }
        if (!ltr) {
          if (position === DockPosition.right && allNodeIds.length >= 0) {
            if (timelineId === get(timelineIds, tailRelation)) {
              return get(postIds, tailRelation);
            }
          }
          if (
            position === DockPosition.left &&
            allNodeIds.length === finalSize
          ) {
            if (timelineId === get(timelineIds, headRelation)) {
              return get(postIds, headRelation);
            }
          }
        }
      }

      if (layout === ScrollTypes.Timeline.LAYOUT.FULL) {
        if (timelineId === get(timelineIds, headRelation)) {
          return get(postIds, headRelation);
        }
        if (timelineId === get(timelineIds, tailRelation)) {
          return get(postIds, tailRelation);
        }
      }
    })
    .filter(removeEmptyElementsFn);

  return result;
};

export const getRange = (
  nodeWithRelations: ScrollTypes.Timeline.NodeWithRelations[],
  finalSize: number
) => {
  return nodeWithRelations.slice(
    1,
    nodeWithRelations.length === finalSize
      ? nodeWithRelations.length - 1
      : nodeWithRelations.length
  );
};

export const getSelectedSliceIdsBody = (
  nodeWithRelationsWithEdgeMap: ScrollTypes.Timeline.NodesWithRelationsMap
) => {
  const { activeId, nodesWithRelations, finalSize } =
    nodeWithRelationsWithEdgeMap;

  const nodeWithRelationsWithEdge = get(nodesWithRelations, activeId, {
    values: [] as Array<ScrollTypes.Timeline.NodeWithRelationsWithEdge>
  });

  const { values } = nodeWithRelationsWithEdge;

  const result = values
    .map(value => {
      const { nodeWithRelations, ltr, layout } = value;
      if (layout === ScrollTypes.Timeline.LAYOUT.PROGRESSIVE) {
        if (ltr) {
          return getRange(nodeWithRelations, finalSize);
        }
        if (!ltr) {
          const nodeWithRelationsReversed =
            CollectionUtil.Array.reverse(nodeWithRelations);
          return getRange(nodeWithRelationsReversed, finalSize);
        }
      }
      if (layout === ScrollTypes.Timeline.LAYOUT.FULL) {
        return nodeWithRelations.slice(1, nodeWithRelations.length - 1);
      }
    })
    .filter(removeEmptyElementsFn);

  return result;
};

export interface SliceMap {
  postId: string;
  sliceId: string;
  nodeWithRelations: ScrollTypes.Timeline.NodeWithRelations;
}

export const getSelectedSliceIds = (
  timelineId: string,
  nodeWithRelationsWithEdgeMap: ScrollTypes.Timeline.NodesWithRelationsMap
) => {
  const { activeId, nodesWithRelations } = nodeWithRelationsWithEdgeMap;

  const nodeWithRelationsWithEdge = get(nodesWithRelations, activeId, {
    values: [] as Array<ScrollTypes.Timeline.NodeWithRelationsWithEdge>
  });

  const { values } = nodeWithRelationsWithEdge;

  const result = values
    .map<SliceMap>(nodeWithRelationsWithEdge => {
      const {
        nodeWithRelations,
        edgeConnections: { timelineIds, postIds, sliceIds }
      } = nodeWithRelationsWithEdge;

      const allNodeIds = nodeWithRelations.map(nodeWithRelation => {
        const {
          node: { id }
        } = nodeWithRelation;
        return id;
      });

      const [headRelation] = allNodeIds;
      const [tailRelation] = CollectionUtil.Array.reverse(allNodeIds);

      if (timelineId === get(timelineIds, headRelation)) {
        return {
          postId: get(postIds, headRelation),
          sliceId: get(sliceIds, headRelation),
          nodeWithRelations: nodeWithRelations.find(
            nodeWithRelation => nodeWithRelation.node.id === headRelation
          )
        };
      }

      if (timelineId === get(timelineIds, tailRelation)) {
        return {
          postId: get(postIds, tailRelation),
          sliceId: get(sliceIds, tailRelation),
          nodeWithRelations: nodeWithRelations.find(
            nodeWithRelation => nodeWithRelation.node.id === tailRelation
          )
        };
      }
    })
    .filter(removeEmptyElementsFn);

  return result;
};
