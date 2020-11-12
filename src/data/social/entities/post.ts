import { Content } from '../../../typings/social';
import { BaseEntity } from '../types';
import { Comment, commentEntity } from './comment';
import { createEntity } from './sub';
import { User, userEntity } from './user';
import { Vote, voteEntity } from './vote';

export type Post = {
  author: User;
  comments: [Comment];
  votes: [Vote];
  content: Content;
  active: boolean;
} & BaseEntity;

export const postEntity = createEntity<Post>('posts', {
  author: userEntity,
  comments: [commentEntity],
  votes: [voteEntity]
});
