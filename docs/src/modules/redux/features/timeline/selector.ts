import { createSelector } from 'reselect';

import { postEntity } from '../../../../../../src/data/social/entities/post';
import { timelineEntity } from '../../../../../../src/data/social/entities/timeline';
import { useCaseEntity } from '../../../../../../src/data/social/entities/usecase';
import { denormalizer } from '../../../../../../src/data/social/normalizer';
import { RootState } from '../../reducers';

export const selectResult = (state: RootState) => state.timeline.result;
export const selectEntities = (state: RootState) => state.timeline.entities;

export const selectTimelineEntities = (state: RootState) =>
  state.timeline.entities.timelines;

export const selectPostEntities = (state: RootState) =>
  state.timeline.entities.posts;

export const selectUserEntities = (state: RootState) =>
  state.timeline.entities.users;

export const selectUserCaseState = createSelector(
  selectEntities,
  selectResult,
  (entities, result) => {
    const useCase = denormalizer(result, useCaseEntity, entities);
    return useCase;
  }
);

export const selectPostById = (postId: string) => {
  return createSelector(selectEntities, entities => {
    return denormalizer(postId, postEntity, entities);
  });
};

export const selectPosts = () =>
  createSelector(
    selectEntities,
    selectPostEntities,
    (entities, postEntities) => {
      const posts = Object.keys(postEntities).map(postId => {
        return denormalizer(postId, postEntity, entities);
      });
      return posts;
    }
  );

export const selectTimelineOwner = (timelineId: string) => {
  return createSelector(selectEntities, entities => {
    const timeline = denormalizer(timelineId, timelineEntity, entities);
    const { owner } = timeline;
    return owner;
  });
};

export const selectPostsOfOwner = (
  timelineId: string,
  sortFn: (a: any, b: any) => number
) =>
  createSelector(
    selectPosts(),
    selectTimelineOwner(timelineId),
    (posts, user) => {
      const postIds = posts
        .filter(post => post.author.id === user.id)
        .sort(sortFn)
        .map(post => post.id);
      return postIds;
    }
  );

export const selectPostsOfFriends = (
  timelineId: string,
  sortFn: (a: any, b: any) => number
) =>
  createSelector(
    selectPosts(),
    selectTimelineOwner(timelineId),
    (posts, user) => {
      const postIds = posts
        .filter(post => user.friends.includes(post.author.id))
        .sort(sortFn)
        .map(post => post.id);
      return postIds;
    }
  );
