import { NormalizedEntity } from '../types';
import { Comment } from './comment';
import { Post } from './post';
import { Timeline } from './timeline';
import { UseCase } from './usecase';
import { User } from './user';
import { Vote } from './vote';

export type Entities = {
  usecases: { [key: string]: NormalizedEntity<UseCase> };
  timelines: { [key: string]: NormalizedEntity<Timeline> };
  posts: { [key: string]: NormalizedEntity<Post> };
  comments: { [key: string]: NormalizedEntity<Comment> };
  votes: { [key: string]: NormalizedEntity<Vote> };
  users: { [key: string]: NormalizedEntity<User> };
};
