import { ScrollTypes } from '@demonstrators-social/shared';
import get from 'lodash/get';

export const getSelectedPostIds = (
  timelineId: string,
  nodeWithRelationsWithEdgeMap: ScrollTypes.Timeline.NodesWithRelationsMap,
  position: string
) => {
  const {
    activeId,
    nodesWithRelations,
    counter,
    finalSize
  } = nodeWithRelationsWithEdgeMap;

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

      if (layout === ScrollTypes.Timeline.LAYOUT.PROGRESSIVE) {
        if (ltr) {
          if (position === 'left' && counter >= 0) {
            const relation = allNodeIds[0];
            if (timelineId === get(timelineIds, relation)) {
              return get(postIds, relation);
            }
          }
          if (position === 'right' && counter === finalSize) {
            const relation = allNodeIds[finalSize - 1];
            if (timelineId === get(timelineIds, relation)) {
              return get(postIds, relation);
            }
          }
        }
        if (!ltr) {
          if (position === 'right' && counter >= 0) {
            const relation = allNodeIds[counter - 1];
            if (timelineId === get(timelineIds, relation)) {
              return get(postIds, relation);
            }
          }
          if (position === 'left' && counter === finalSize) {
            const relation = allNodeIds[0];
            if (timelineId === get(timelineIds, relation)) {
              return get(postIds, relation);
            }
          }
        }
      }

      if (layout === ScrollTypes.Timeline.LAYOUT.FULL) {
        const [headRelation] = allNodeIds.slice(0, 1);
        const [tailRelation] = allNodeIds.slice(-1);

        if (timelineId === get(timelineIds, headRelation)) {
          return get(postIds, headRelation);
        }

        if (timelineId === get(timelineIds, tailRelation)) {
          return get(postIds, tailRelation);
        }
      }

      return null;
    })
    .filter((item, index, list) => {
      return list.indexOf(item) === index;
    });

  return result;
};

export const getSelectedSliceIdsBody = (
  value: ScrollTypes.Timeline.NodeWithRelationsWithEdge,
  counter: number,
  finalSize: number
) => {
  const { nodeWithRelations, ltr, layout } = value;
  if (layout === ScrollTypes.Timeline.LAYOUT.PROGRESSIVE) {
    if (ltr) {
      if (counter > 0) {
        if (counter < finalSize) {
          return nodeWithRelations.slice(1, counter);
        }
        if (counter === finalSize) {
          return nodeWithRelations.slice(1, finalSize - 1);
        }
      }
    }
    if (!ltr) {
      if (counter > 0) {
        if (counter < finalSize) {
          return nodeWithRelations
            .slice()
            .reverse()
            .slice(1, counter)
            .reverse();
        }
        if (counter === finalSize) {
          return nodeWithRelations.slice(1, finalSize - 1);
        }
      }
    }
  }
  if (layout === ScrollTypes.Timeline.LAYOUT.FULL) {
    return nodeWithRelations.slice(1, nodeWithRelations.length - 1);
  }
  return null;
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

  const result = values.map<SliceMap>(nodeWithRelationsWithEdge => {
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

    const [headRelation] = allNodeIds.slice(0, 1);
    const [tailRelation] = allNodeIds.slice(-1);

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

    return null;
  });

  return result;
};
