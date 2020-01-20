import { action } from 'typesafe-actions';
import { Comment, Post } from '../../../../../../src/typings/social';
import { schema, mocks } from '../../../../../../src/data/social';

import {
  UseCaseEntities,
  PostEntities
} from '../../../../../../src/typings/social/schema';

import {
  ADD_COMMENT,
  DELETE_POST,
  ADD_POST,
  NORMALIZE_DATA
} from './actionTypes';

const { commentSchema, postSchema, useCaseSchema, normalizeWrapper } = schema;
const { usecaseData } = mocks;

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

export const removePost = (timelineId: number, postId: number) => {
  return action(DELETE_POST, { timelineId, postId });
};

export const createComment = (postId: number, newComment: Comment) => {
  const comment = normalizeWrapper<PostEntities>(newComment, commentSchema);
  return action(ADD_COMMENT, { postId, comment });
};
