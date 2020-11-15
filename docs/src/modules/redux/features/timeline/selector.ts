import _ from 'lodash';
import { createSelector } from 'reselect';

import { postEntity } from '../../../../../../src/data/social/entities/post';
import { timelineEntity } from '../../../../../../src/data/social/entities/timeline';
import { useCaseEntity } from '../../../../../../src/data/social/entities/usecase';
import { denormalizer } from '../../../../../../src/data/social/normalizer';
import { VIEW } from '../../../recoil/features/scroll/timeline/reducer';
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

export const selectInteractionDataForPostScenario = (
  timelineId: string,
  otherTimelineId: string,
  postIds: Array<string>,
  currentViews: { [key: string]: VIEW } = {
    [timelineId]: VIEW.TIMELINE,
    [otherTimelineId]: VIEW.POSTS
  },
  sortFn: (a: any, b: any) => number
) => {
  return createSelector(
    selectPostsOfOwner(otherTimelineId, sortFn),
    selectPostsOfOwner(timelineId, sortFn),
    (postsOfOwnerForOtherTimelineId, postsOfOwnerForTimelineId) => {
      const timelineView = currentViews[timelineId];
      const otherTimelineView = currentViews[otherTimelineId];

      if (
        (timelineView === VIEW.TIMELINE &&
          otherTimelineView === VIEW.TIMELINE) ||
        (timelineView === VIEW.POSTS && otherTimelineView === VIEW.POSTS)
      ) {
        return [];
      }

      if (timelineView === VIEW.TIMELINE) {
        return postIds.filter(postId =>
          _.includes(postsOfOwnerForOtherTimelineId, postId)
        );
      }

      if (timelineView === VIEW.POSTS) {
        return postIds.filter(postId =>
          _.includes(postsOfOwnerForTimelineId, postId)
        );
      }

      return [];
    }
  );
};
