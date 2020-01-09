import { action } from 'typesafe-actions';

import {
  Comment,
  commentSchema,
  normalizeWrapper,
  Post,
  PostEntities,
  postSchema,
  usecaseData,
  UseCaseEntities,
  useCaseSchema,
} from '../../../../../../src/typings/social';
import { ADD_COMMENT, ADD_POST, NORMALIZE_DATA } from './actionTypes';

export const normalizeData = () => {
  const { entities, result } = normalizeWrapper<UseCaseEntities>(
    usecaseData,
    useCaseSchema
  );
  return action(NORMALIZE_DATA, { entities, result });
};

export const createPost = (timelineId: number, newPost: Post) => {
  const post = normalizeWrapper<PostEntities>(newPost, postSchema);
  return action(ADD_POST, { timelineId, post });
};

export const createComment = (postId: number, newComment: Comment) => {
  const comment = normalizeWrapper<PostEntities>(newComment, commentSchema);
  return action(ADD_COMMENT, { postId, comment });
};
