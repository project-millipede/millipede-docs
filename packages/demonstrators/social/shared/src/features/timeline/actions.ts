import { CollectionUtil } from '@app/utils';
import { commentEntity, normalizer, postEntity, Types, useCaseEntity } from '@demonstrators-social/data';
import { produce } from 'immer';
import { SetterOrUpdater } from 'recoil';

import { Timeline } from './types';

export const normalizeData = (
  set: SetterOrUpdater<Timeline>,
  useCase: Types.UseCase
) => {
  const { entities, result } = normalizer.normalizer(useCase, useCaseEntity);
  set(prevState =>
    produce(prevState, draftState => {
      draftState.entities = entities;
      draftState.result = result;
      return draftState;
    })
  );
};

export const createPost = (
  set: SetterOrUpdater<Timeline>,
  post: Types.Post
) => {
  const { result, entities } = normalizer.normalizer(post, postEntity);
  set(prevState =>
    produce(prevState, draftState => {
      const post = entities.posts[result];
      draftState.entities.posts[result] = post;
      return draftState;
    })
  );
};

export const removePost = (
  set: SetterOrUpdater<Timeline>,
  _timelineId: string,
  postId: string
) => {
  set(prevState =>
    produce(prevState, draftState => {
      draftState.entities.posts =
        CollectionUtil.Object.removePropertyFromObject(
          prevState.entities.posts,
          postId
        );

      // const postIndex = prevState.entities.timelines[
      //   timelineId
      // ].posts.findIndex(post => post === postId);

      // draftState.entities.timelines[timelineId].posts =
      //   CollectionUtil.Array.omitAtIndex(
      //     prevState.entities.timelines[timelineId].posts,
      //     postIndex
      //   );

      return draftState;
    })
  );
};

export const createComment = (
  set: SetterOrUpdater<Timeline>,
  postId: string,
  comment: Types.Comment
) => {
  const { result, entities } = normalizer.normalizer(comment, commentEntity);
  set(prevState =>
    produce(prevState, draftState => {
      const comment = entities.comments[result];
      draftState.entities.comments[result] = comment;
      draftState.entities.posts[postId].comments =
        CollectionUtil.Array.insertAtWithPreserve(
          prevState.entities.posts[postId].comments,
          result,
          0
        );
      return draftState;
    })
  );
};
