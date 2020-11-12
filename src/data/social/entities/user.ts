import { Profile } from '../../../typings/social';
import { BaseEntity } from '../types';
import { createEntity } from './sub';

export type User = {
  profile: Profile;
  friends: Array<string>;
} & BaseEntity;

export const userEntity = createEntity<User>('users', {});
