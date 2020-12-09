import { Comment, commentEntity } from './comment';
import { NormalizedEntity } from './normalize/types';
import { Post, postEntity } from './post';
import { Timeline, timelineEntity } from './timeline';
import { UseCase, useCaseEntity } from './usecase';
import { User, userEntity } from './user';
import { Vote, voteEntity } from './vote';

export * as normalizer from './normalize';
export {
  commentEntity,
  postEntity,
  timelineEntity,
  useCaseEntity,
  userEntity,
  voteEntity
};

export type Entities = {
  usecases: { [key: string]: NormalizedEntity<UseCase> };
  timelines: { [key: string]: NormalizedEntity<Timeline> };
  posts: { [key: string]: NormalizedEntity<Post> };
  comments: { [key: string]: NormalizedEntity<Comment> };
  votes: { [key: string]: NormalizedEntity<Vote> };
  users: { [key: string]: NormalizedEntity<User> };
};
