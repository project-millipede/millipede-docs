import { action } from 'typesafe-actions';

import { schema } from '../../../../../../src/data/social';
import { Comment, Post, UseCase } from '../../../../../../src/typings/social';
import { PostEntities, UseCaseEntities } from '../../../../../../src/typings/social/schema';
import { ADD_COMMENT, ADD_POST, DELETE_POST, NORMALIZE_DATA } from './actionTypes';

const { commentSchema, postSchema, useCaseSchema, normalizeWrapper } = schema;

export const normalizeData = (data: UseCase) => {
  const { entities, result } = normalizeWrapper<UseCaseEntities>(
    data,
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
