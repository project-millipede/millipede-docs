import { CollectionUtil } from '@app/utils';
import { Scroll } from '@demonstrators-social/shared';
import get from 'lodash/get';

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

      if (ltr) {
        if (
          position === Scroll.Timeline.DockPosition.left &&
          allNodeIds.length >= 1
        ) {
          if (timelineId === get(timelineIds, headRelationId)) {
            const postId = get(postIds, headRelationId);
            return !acc.includes(postId) ? [...acc, postId] : acc;
          }
        }
        if (
          position === Scroll.Timeline.DockPosition.right &&
          allNodeIds.length === finalSize
        ) {
          if (timelineId === get(timelineIds, tailRelationId)) {
            const postId = get(postIds, tailRelationId);
            return !acc.includes(postId) ? [...acc, postId] : acc;
          }
        }
      }
      if (!ltr) {
        if (
          position === Scroll.Timeline.DockPosition.left &&
          allNodeIds.length === finalSize
        ) {
          if (timelineId === get(timelineIds, headRelationId)) {
            const postId = get(postIds, headRelationId);
            return !acc.includes(postId) ? [...acc, postId] : acc;
          }
        }
        if (
          position === Scroll.Timeline.DockPosition.right &&
          allNodeIds.length >= 1
        ) {
          if (timelineId === get(timelineIds, tailRelationId)) {
            const postId = get(postIds, tailRelationId);
            return !acc.includes(postId) ? [...acc, postId] : acc;
          }
        }
      }

      // This is the reduced version, identical to the above
      // if (
      //   position === Scroll.Timeline.DockPosition.left && ltr
      //     ? allNodeIds.length >= 1
      //     : allNodeIds.length === finalSize
      // ) {
      //   if (timelineId === get(timelineIds, headRelationId)) {
      //     const postId = get(postIds, headRelationId);
      //     return !acc.includes(postId) ? [...acc, postId] : acc;
      //   }
      // }
      // if (
      //   position === Scroll.Timeline.DockPosition.right && ltr
      //     ? allNodeIds.length === finalSize
      //     : allNodeIds.length >= 1
      // ) {
      //   if (timelineId === get(timelineIds, tailRelationId)) {
      //     const postId = get(postIds, tailRelationId);
      //     return !acc.includes(postId) ? [...acc, postId] : acc;
      //   }
      // }

      return acc;
    }, []);
};

// Most important for N-to-N Scenario, no activeId
// export const getSelectedSliceIds = (
//   timelineId: string,
//   nodeWithRelationsWithEdgeMap: Scroll.Timeline.NodesWithRelationsMap
// ) => {
//   const {
//     // activeId,
//     nodesWithRelations
//   } = nodeWithRelationsWithEdgeMap;

//   // const activeNodesWithRelations = get(
//   //   nodesWithRelations,
//   //   activeId,
//   //   [] as Array<Scroll.Timeline.NodeWithRelationsWithEdge>
//   // );

//   // const result = activeNodesWithRelations
//   const result = Object.values(nodesWithRelations)
//     .flat()
//     .map<Scroll.Timeline.SliceMap>(nodeWithRelationsWithEdge => {
//       const {
//         nodeWithRelations,
//         edgeConnections: { timelineIds, postIds, sliceIds }
//       } = nodeWithRelationsWithEdge;

//       const allNodeIds = nodeWithRelations.map(({ node: { id } }) => id);

//       const [headRelationId] = allNodeIds;
//       const [tailRelationId] = allNodeIds.slice(-1);

//       if (timelineId === get(timelineIds, headRelationId)) {
//         return {
//           postId: get(postIds, headRelationId),
//           sliceId: get(sliceIds, headRelationId),
//           nodeWithRelations: nodeWithRelations.find(
//             nodeWithRelation => nodeWithRelation.node.id === headRelationId
//           )
//         };
//       }

//       if (timelineId === get(timelineIds, tailRelationId)) {
//         return {
//           postId: get(postIds, tailRelationId),
//           sliceId: get(sliceIds, tailRelationId),
//           nodeWithRelations: nodeWithRelations.find(
//             nodeWithRelation => nodeWithRelation.node.id === tailRelationId
//           )
//         };
//       }
//     })
//     .filter(removeEmptyElementsFn);

//   return result;
// };

export const getDockedSliceIds = (
  timelineId: string,
  postId: string,
  nodeWithRelationsWithEdgeMap: Scroll.Timeline.NodesWithRelationsMap
) => {
  const { nodesWithRelations } = nodeWithRelationsWithEdgeMap;

  const activeNodesWithRelations = get(
    nodesWithRelations,
    postId,
    [] as Array<Scroll.Timeline.NodeWithRelationsWithEdge>
  );

  // const result = [activeNodesWithRelations].map<Scroll.Timeline.SliceMap>(
  //   nodeWithRelationsWithEdge => {
  //     const {
  //       nodeWithRelations,
  //       edgeConnections: { timelineIds, sliceIds }
  //     } = nodeWithRelationsWithEdge;

  //     console.log('sliceIds: ', sliceIds);

  //     const allNodeIds = nodeWithRelations.map(({ node: { id } }) => id);

  //     const [headRelationId] = allNodeIds;
  //     const [tailRelationId] = allNodeIds.slice(-1);

  //     if (timelineId === get(timelineIds, headRelationId)) {
  //       return {
  //         sliceId: get(sliceIds, headRelationId),
  //         nodeWithRelations: nodeWithRelations.find(
  //           nodeWithRelation => nodeWithRelation.node.id === headRelationId
  //         )
  //       };
  //     }

  //     if (timelineId === get(timelineIds, tailRelationId)) {
  //       return {
  //         sliceId: get(sliceIds, tailRelationId),
  //         nodeWithRelations: nodeWithRelations.find(
  //           nodeWithRelation => nodeWithRelation.node.id === tailRelationId
  //         )
  //       };
  //     }
  //   }
  // );

  // const result = Object.values(nodesWithRelations)
  //   .flat()
  //   .map<Scroll.Timeline.SliceMap>(
  const result = activeNodesWithRelations.map<Scroll.Timeline.SliceMap>(
    nodeWithRelationsWithEdge => {
      const {
        nodeWithRelations,
        edgeConnections: { timelineIds, sliceIds }
      } = nodeWithRelationsWithEdge;

      const allNodeIds = nodeWithRelations.map(({ node: { id } }) => id);

      const [headRelationId] = allNodeIds;
      const [tailRelationId] = allNodeIds.slice(-1);

      if (timelineId === get(timelineIds, headRelationId)) {
        return {
          sliceId: get(sliceIds, headRelationId),
          nodeWithRelations: nodeWithRelations.find(
            nodeWithRelation => nodeWithRelation.node.id === headRelationId
          )
        };
      }

      if (timelineId === get(timelineIds, tailRelationId)) {
        return {
          sliceId: get(sliceIds, tailRelationId),
          nodeWithRelations: nodeWithRelations.find(
            nodeWithRelation => nodeWithRelation.node.id === tailRelationId
          )
        };
      }
    }
  );

  // TODO: Docs
  const resultWithoutDuplicates = result.reduce<
    Array<Scroll.Timeline.SliceMap>
  >((acc, value) => {
    const allSliceIds = acc.map(value => value.sliceId);
    if (allSliceIds.includes(value.sliceId)) {
      return acc;
    } else {
      return [...acc, value];
    }
  }, []);

  // return result

  return resultWithoutDuplicates;
};

export const getDockedSliceIds2 = (
  _timelineId: string,
  postId: string,
  nodeWithRelationsWithEdgeMap: Scroll.Timeline.NodesWithRelationsMap
) => {
  const { nodesWithRelations } = nodeWithRelationsWithEdgeMap;

  // const activeNodesWithRelations = get(
  //   nodesWithRelations,
  //   postId,
  //   [] as Array<Scroll.Timeline.NodeWithRelationsWithEdge>
  // );

  // const result = activeNodesWithRelations.map<Scroll.Timeline.SliceMap>(
  // nodeWithRelationsWithEdge => {

  const result = Object.values(nodesWithRelations)
    .flat()
    .reduce<Array<string>>((acc, nodeWithRelationsWithEdge) => {
      const {
        nodeWithRelations,
        edgeConnections: {
          // timelineIds,
          postIds,
          sliceIds
        }
      } = nodeWithRelationsWithEdge;

      const allNodeIds = nodeWithRelations.map(({ node: { id } }) => id);

      const [headRelationId] = allNodeIds;
      const [tailRelationId] = allNodeIds.slice(-1);

      if (postId === get(postIds, headRelationId)) {
        const sliceId = get(sliceIds, headRelationId);
        return !acc.includes(sliceId) ? [...acc, sliceId] : acc;
      }

      if (postId === get(postIds, tailRelationId)) {
        const sliceId = get(sliceIds, tailRelationId);
        return !acc.includes(sliceId) ? [...acc, sliceId] : acc;
      }

      // if (timelineId === get(timelineIds, headRelationId)) {
      //   return {
      //     sliceId: get(sliceIds, headRelationId),
      //     nodeWithRelations: nodeWithRelations.find(
      //       nodeWithRelation => nodeWithRelation.node.id === headRelationId
      //     )
      //   };
      // }

      // if (timelineId === get(timelineIds, tailRelationId)) {
      //   return {
      //     sliceId: get(sliceIds, tailRelationId),
      //     nodeWithRelations: nodeWithRelations.find(
      //       nodeWithRelation => nodeWithRelation.node.id === tailRelationId
      //     )
      //   };
      // }

      return acc;
    }, []);

  console.log('result: ', result);

  return result;
};

// export const getBodySliceIds = (
//   nodeWithRelationsWithEdgeMap: Scroll.Timeline.NodesWithRelationsMap
// ) => {
//   const { activeId, nodesWithRelations, finalSize } =
//     nodeWithRelationsWithEdgeMap;

//   const activeNodesWithRelations = get(
//     nodesWithRelations,
//     activeId,
//     [] as Array<Scroll.Timeline.NodeWithRelationsWithEdge>
//   );

//   const result = activeNodesWithRelations.map(value => {
//     const { ltr, layout, nodeWithRelations } = value;
//     if (layout === Scroll.Timeline.LAYOUT.PROGRESSIVE) {
//       return CollectionUtil.Array.withoutBorders<Scroll.Timeline.NodeWithRelations>(
//         nodeWithRelations,
//         finalSize,
//         ltr
//       );
//     }
//     if (layout === Scroll.Timeline.LAYOUT.FULL) {
//       return nodeWithRelations.slice(1, nodeWithRelations.length - 1);
//     }
//   });

//   return result;
// };

export const getBodySliceIds = (
  nodeWithRelationsWithEdgeMap: Scroll.Timeline.NodesWithRelationsMap
) => {
  // TODO:
  // issue with name decalration => nodeWithRelationsWithEdgeMap has property nodesWithRelations
  const { nodesWithRelations, finalSize } = nodeWithRelationsWithEdgeMap;

  const bodySliceIds = Object.values(nodesWithRelations)
    .flat()
    .map(value => {
      // and here again
      const { ltr, nodeWithRelations } = value;

      return CollectionUtil.Array.withoutBorders<Scroll.Timeline.NodeWithRelations>(
        nodeWithRelations,
        finalSize,
        ltr
      );
    });

  return bodySliceIds;
};
