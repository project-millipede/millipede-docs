import { BaseEntity } from '../types';
import { Post, postEntity } from './post';
import { createEntity } from './sub';
import { User, userEntity } from './user';

export type Timeline = {
  owner: User;
  posts: Array<Post>;
} & BaseEntity;

export const timelineEntity = createEntity<Timeline>('timelines', {
  owner: userEntity,
  posts: [postEntity]
});
