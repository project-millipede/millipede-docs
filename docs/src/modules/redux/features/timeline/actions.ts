import { action } from 'typesafe-actions';

import { commentEntity } from '../../../../../../src/data/social/entities/comment';
import { postEntity } from '../../../../../../src/data/social/entities/post';
import { useCaseEntity } from '../../../../../../src/data/social/entities/usecase';
import { normalizer } from '../../../../../../src/data/social/normalizer';
import { Comment, Post, UseCase } from '../../../../../../src/typings/social';
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  NORMALIZE_DATA
} from './actionTypes';

export const normalizeData = (data: UseCase) => {
  const { entities, result } = normalizer(data, useCaseEntity);
  return action(NORMALIZE_DATA, { entities, result });
};

export const createPost = (newPost: Post) => {
  const post = normalizer(newPost, postEntity);
  return action(ADD_POST, { post });
};

export const removePost = (timelineId: string, postId: string) => {
  return action(DELETE_POST, { timelineId, postId });
};

// export const removePost = (postId: string) => {
//   return action(DELETE_POST, { postId });
// };

export const createComment = (postId: string, newComment: Comment) => {
  const comment = normalizer(newComment, commentEntity);
  return action(ADD_COMMENT, { postId, comment });
};
