import { Profile } from '../types';
import { BaseEntity } from './normalize/types';
import { createEntity } from './sub';


export type User = {
  profile: Profile;
  friends: Array<string>;
} & BaseEntity;

export const userEntity = createEntity<User>('users', {});
