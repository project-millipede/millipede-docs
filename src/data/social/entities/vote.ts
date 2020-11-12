import { BaseEntity } from '../types';
import { createEntity } from './sub';
import { User, userEntity } from './user';

export type Vote = {
  voter: User;
} & BaseEntity;

export const voteEntity = createEntity<Vote>('voters', {
  voter: userEntity
});
