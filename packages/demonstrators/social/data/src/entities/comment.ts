import { Content } from '../types';
import { BaseEntity } from './normalize/types';
import { createEntity } from './sub';
import { User, userEntity } from './user';

export type Comment = {
  commenter: User;
  content: Content;
} & BaseEntity;

export const commentEntity = createEntity<Comment>('comments', {
  commenter: userEntity
});
