import { Content } from '../../../typings/social';
import { BaseEntity } from '../types';
import { createEntity } from './sub';
import { User, userEntity } from './user';

export type Comment = {
  commenter: User;
  content: Content;
} & BaseEntity;

export const commentEntity = createEntity<Comment>('comments', {
  commenter: userEntity
});
