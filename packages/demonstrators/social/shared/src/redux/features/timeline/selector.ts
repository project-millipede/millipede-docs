import { isEmptyString } from '@app/utils/src/string';
import { normalizer, postEntity, timelineEntity, useCaseEntity } from '@demonstrators-social/data';
import includes from 'lodash/includes';
import { createSelector } from 'reselect';

import { Timeline } from '../../../recoil/features/scroll/types';
import { RootState } from '../reducers';

export const selectResult = (state: RootState) =>
  state && state.timeline && state.timeline.result;
export const selectEntities = (state: RootState) =>
  state && state.timeline && state.timeline.entities;

export const selectTimelineEntities = (state: RootState) =>
  state &&
  state.timeline &&
  state.timeline.entities &&
  state.timeline.entities.timelines;

export const selectPostEntities = (state: RootState) =>
  state &&
  state.timeline &&
  state.timeline.entities &&
  state.timeline.entities.posts;

export const selectUserEntities = (state: RootState) =>
  state &&
  state.timeline &&
  state.timeline.entities &&
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
      if (postEntities == null) return [];
      const posts = Object.keys(postEntities).map(postId => {
        return normalizer.denormalizer(postId, postEntity, entities);
      });
      return posts;
    }
  );

export const selectTimelineOwner = (timelineId: string) => {
  return createSelector(selectEntities, entities => {
    if (
      // timelineId == null ||
      // timelineId == undefined ||
      isEmptyString(timelineId)
    )
      return null;
    const timeline = normalizer.denormalizer(
      timelineId,
      timelineEntity,
      entities
    );

    // debugger;

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
  // currentViews: { [key: string]: Timeline.TView } = {
  //   [timelineId]: Timeline.View.TIMELINE,
  //   [otherTimelineId]: Timeline.View.POSTS
  // },
  timelineView: Timeline.TView = Timeline.View.TIMELINE,
  otherTimelineView: Timeline.TView = Timeline.View.POSTS,
  sortFn: (a: any, b: any) => number
) => {
  return createSelector(
    selectPostsOfOwner(otherTimelineId, sortFn),
    selectPostsOfOwner(timelineId, sortFn),
    (postsOfOwnerForOtherTimelineId, postsOfOwnerForTimelineId) => {
      // const timelineView = currentViews[timelineId];
      // const otherTimelineView = currentViews[otherTimelineId];

      if (
        (timelineView === Timeline.View.TIMELINE &&
          otherTimelineView === Timeline.View.TIMELINE) ||
        (timelineView === Timeline.View.POSTS &&
          otherTimelineView === Timeline.View.POSTS)
      ) {
        return [];
      }

      if (timelineView === Timeline.View.TIMELINE) {
        return postIds.filter(postId =>
          includes(postsOfOwnerForOtherTimelineId, postId)
        );
      }

      if (timelineView === Timeline.View.POSTS) {
        return postIds.filter(postId =>
          includes(postsOfOwnerForTimelineId, postId)
        );
      }

      return [];
    }
  );
};
