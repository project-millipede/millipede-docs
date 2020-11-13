import _ from 'lodash';

import {
  LAYOUT,
  NodesWithRelationsMap,
  NodeWithRelations,
  NodeWithRelationsWithEdge,
} from '../../../../../../../docs/src/modules/recoil/features/scroll/timeline/reducer';

export const getSelectedPostIds = (
  timelineId: string,
  nodeWithRelationsWithEdgeMap: NodesWithRelationsMap,
  position: string
) => {
  const {
    activeId,
    nodesWithRelations,
    counter,
    finalSize
  } = nodeWithRelationsWithEdgeMap;

  const nodeWithRelationsWithEdge = _.get(nodesWithRelations, activeId, {
    values: [] as Array<NodeWithRelationsWithEdge>
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

      if (layout === LAYOUT.PROGRESSIVE) {
        if (ltr) {
          if (position === 'left' && counter >= 0) {
            const relation = allNodeIds[0];
            if (timelineId === _.get(timelineIds, relation)) {
              return _.get(postIds, relation);
            }
          }
          if (position === 'right' && counter === finalSize) {
            const relation = allNodeIds[finalSize - 1];
            if (timelineId === _.get(timelineIds, relation)) {
              return _.get(postIds, relation);
            }
          }
        }
        if (!ltr) {
          if (position === 'right' && counter >= 0) {
            const relation = allNodeIds[counter - 1];
            if (timelineId === _.get(timelineIds, relation)) {
              return _.get(postIds, relation);
            }
          }
          if (position === 'left' && counter === finalSize) {
            const relation = allNodeIds[0];
            if (timelineId === _.get(timelineIds, relation)) {
              return _.get(postIds, relation);
            }
          }
        }
      }

      if (layout === LAYOUT.FULL) {
        const [headRelation] = allNodeIds.slice(0, 1);
        const [tailRelation] = allNodeIds.slice(-1);

        if (timelineId === _.get(timelineIds, headRelation)) {
          return _.get(postIds, headRelation);
        }

        if (timelineId === _.get(timelineIds, tailRelation)) {
          return _.get(postIds, tailRelation);
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
  value: NodeWithRelationsWithEdge,
  counter: number,
  finalSize: number
) => {
  const { nodeWithRelations, ltr, layout } = value;
  if (layout === LAYOUT.PROGRESSIVE) {
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
  if (layout === LAYOUT.FULL) {
    return nodeWithRelations.slice(1, nodeWithRelations.length - 1);
  }
};

export interface SliceMap {
  postId: string;
  sliceId: string;
  nodeWithRelations: NodeWithRelations;
}

export const getSelectedSliceIds = (
  timelineId: string,
  nodeWithRelationsWithEdgeMap: NodesWithRelationsMap
) => {
  const { activeId, nodesWithRelations } = nodeWithRelationsWithEdgeMap;

  const nodeWithRelationsWithEdge = _.get(nodesWithRelations, activeId, {
    values: [] as Array<NodeWithRelationsWithEdge>
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

    if (timelineId === _.get(timelineIds, headRelation)) {
      return {
        postId: _.get(postIds, headRelation),
        sliceId: _.get(sliceIds, headRelation),
        nodeWithRelations: nodeWithRelations.find(
          nodeWithRelation => nodeWithRelation.node.id === headRelation
        )
      };
    }

    if (timelineId === _.get(timelineIds, tailRelation)) {
      return {
        postId: _.get(postIds, tailRelation),
        sliceId: _.get(sliceIds, tailRelation),
        nodeWithRelations: nodeWithRelations.find(
          nodeWithRelation => nodeWithRelation.node.id === tailRelation
        )
      };
    }

    return null;
  });

  return result;
};
