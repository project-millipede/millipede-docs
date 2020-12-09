import { commentEntity, normalizer, postEntity, Types, useCaseEntity } from '@demonstrators-social/data';
import { action } from 'typesafe-actions';

import { ADD_COMMENT, ADD_POST, DELETE_POST, NORMALIZE_DATA } from './actionTypes';

export const normalizeData = (data: Types.UseCase) => {
  const { entities, result } = normalizer.normalizer(data, useCaseEntity);
  return action(NORMALIZE_DATA, { entities, result });
};

export const createPost = (newPost: Types.Post) => {
  const post = normalizer.normalizer(newPost, postEntity);
  return action(ADD_POST, { post });
};

export const removePost = (timelineId: string, postId: string) => {
  return action(DELETE_POST, { timelineId, postId });
};

// export const removePost = (postId: string) => {
//   return action(DELETE_POST, { postId });
// };

export const createComment = (postId: string, newComment: Types.Comment) => {
  const comment = normalizer.normalizer(newComment, commentEntity);
  return action(ADD_COMMENT, { postId, comment });
};
