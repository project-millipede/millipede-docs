import { normalizer, postEntity, timelineEntity, useCaseEntity } from '@demonstrators-social/data';
import _ from 'lodash';
import { createSelector } from 'reselect';

import { Timeline } from '../../../recoil/features/scroll/types';
import { RootState } from '../reducers';

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
    const useCase = normalizer.denormalizer(result, useCaseEntity, entities);
    return useCase;
  }
);

export const selectPostById = (postId: string) => {
  return createSelector(selectEntities, entities => {
    return normalizer.denormalizer(postId, postEntity, entities);
  });
};

export const selectPosts = () =>
  createSelector(
    selectEntities,
    selectPostEntities,
    (entities, postEntities) => {
      const posts = Object.keys(postEntities).map(postId => {
        return normalizer.denormalizer(postId, postEntity, entities);
      });
      return posts;
    }
  );

export const selectTimelineOwner = (timelineId: string) => {
  return createSelector(selectEntities, entities => {
    const timeline = normalizer.denormalizer(
      timelineId,
      timelineEntity,
      entities
    );
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
  currentViews: { [key: string]: Timeline.VIEW } = {
    [timelineId]: Timeline.VIEW.TIMELINE,
    [otherTimelineId]: Timeline.VIEW.POSTS
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
        (timelineView === Timeline.VIEW.TIMELINE &&
          otherTimelineView === Timeline.VIEW.TIMELINE) ||
        (timelineView === Timeline.VIEW.POSTS &&
          otherTimelineView === Timeline.VIEW.POSTS)
      ) {
        return [];
      }

      if (timelineView === Timeline.VIEW.TIMELINE) {
        return postIds.filter(postId =>
          _.includes(postsOfOwnerForOtherTimelineId, postId)
        );
      }

      if (timelineView === Timeline.VIEW.POSTS) {
        return postIds.filter(postId =>
          _.includes(postsOfOwnerForTimelineId, postId)
        );
      }

      return [];
    }
  );
};
