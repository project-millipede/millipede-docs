import { CollectionUtil, StringUtil } from '@app/utils';
import { normalizer, postEntity, timelineEntity, Types, useCaseEntity } from '@demonstrators-social/data';
import includes from 'lodash/includes';
import { selector, selectorFamily } from 'recoil';

import { Scroll } from '../..';
import { timelineViewState } from '../scroll/timeline/states';
import { timelineState } from './states';

export const useCaseSelector = selector<Types.UseCase>({
  key: 'use-case-selector',
  get: ({ get }) => {
    const { entities, result } = get(timelineState);
    return (
      normalizer.denormalizer(result, useCaseEntity, entities) || {
        id: '',
        timelines: []
      }
    );
  }
});

export const postByIdSelector = selectorFamily<Types.Post, string>({
  key: 'post-by-id-selector',
  get:
    postId =>
    ({ get }) => {
      const { entities } = get(timelineState);
      return normalizer.denormalizer(postId, postEntity, entities);
    }
});

export const timelineOfOwnerSelector = selectorFamily<Types.User, string>({
  key: 'timeline-of-owner-selector',
  get:
    timelineId =>
    ({ get }) => {
      if (StringUtil.isEmptyString(timelineId)) return null;
      const { entities } = get(timelineState);
      const { owner } = normalizer.denormalizer(
        timelineId,
        timelineEntity,
        entities
      );
      return owner;
    }
});

export const postsSelector = selector<Array<Types.Post>>({
  key: 'posts-selector',
  get: ({ get }) => {
    const { entities } = get(timelineState);
    return Object.keys(entities.posts).map(postId => {
      return normalizer.denormalizer(postId, postEntity, entities);
    });
  }
});

export const SortDirection = {
  ACS: 'ASC',
  DECS: 'DECS'
} as const;

export type TSortDirection = typeof SortDirection[keyof typeof SortDirection];

/**
 * Note:
 * The following selectors, postIdsOfOwnerSelector, and postIdsOfFriendSelector
 * differ in the filter statement only; further refactoring has to combine both.
 */

export const postIdsOfOwnerSelector = selectorFamily<
  Array<string>,
  {
    timelineId: string;
    sortDirection: TSortDirection;
  }
>({
  key: 'post-ids-of-owner-selector',
  get:
    ({ timelineId, sortDirection }) =>
    ({ get }) => {
      const posts = get(postsSelector);
      const user = get(timelineOfOwnerSelector(timelineId));
      return posts
        .filter(post => post.author.id === user.id)
        .sort(
          sortDirection === 'DECS'
            ? CollectionUtil.Array.compareDescFn(item => item.content.createdAt)
            : CollectionUtil.Array.compareAscFn(item => item.content.createdAt)
        )
        .map(post => post.id);
    }
});

export const postIdsOfFriendSelector = selectorFamily<
  Array<string>,
  { timelineId: string; sortDirection: TSortDirection }
>({
  key: 'post-ids-of-friend-selector',
  get:
    ({ timelineId, sortDirection }) =>
    ({ get }) => {
      const posts = get(postsSelector);
      const user = get(timelineOfOwnerSelector(timelineId));
      return posts
        .filter(post => user.friends.includes(post.author.id))
        .sort(
          sortDirection === 'DECS'
            ? CollectionUtil.Array.compareDescFn(item => item.content.createdAt)
            : CollectionUtil.Array.compareAscFn(item => item.content.createdAt)
        )
        .map(post => post.id);
    }
});

/**
 * Determine postIds per timeline, based on which tab is active.
 * An active tab is either
 * - news-feed, items created by the friends of the owner or
 * - posts, items created by the owner.
 */

export const postIdsSelector = selectorFamily<Array<string>, string>({
  key: 'post-ids-selector',
  get:
    timelineId =>
    ({ get }) => {
      const timelineView = get(timelineViewState(timelineId));

      const postIds =
        timelineView.activeTab === Scroll.Timeline.View.TIMELINE
          ? postIdsOfFriendSelector({
              timelineId: timelineId,
              sortDirection: SortDirection.DECS
            })
          : postIdsOfOwnerSelector({
              timelineId: timelineId,
              sortDirection: SortDirection.DECS
            });

      return postIds;
    }
});

export const interactionDataForPostScenarioSelector = selectorFamily<
  Array<string>,
  boolean
>({
  key: 'interaction-data-for-post-scenario-selector',
  get:
    ltr =>
    ({ get }) => {
      const useCase = get(useCaseSelector);

      const { timelines } = useCase;

      const [leftTimeline, rightTimeline] = timelines;

      const { id: leftTimelineId } = leftTimeline || { id: '' };
      const { id: rightTimelineId } = rightTimeline || { id: '' };

      const postIdsLeft = get(postIdsSelector(leftTimelineId));
      const postIdsRight = get(postIdsSelector(rightTimelineId));

      const diff = ltr
        ? postIdsLeft.filter(postId => includes(postIdsRight, postId))
        : postIdsRight.filter(postId => includes(postIdsLeft, postId));

      return diff;
    }
});
