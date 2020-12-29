import includes from 'lodash/includes';
import without from 'lodash/without';

import { User } from '../../types';

export const createFriendships = (
  users: Array<User>,
  rootUsers: Array<string>
) => {
  const allFriendIds = users.map(u => u.id);
  const rootFriendIds = without(allFriendIds, ...rootUsers);

  return users.reduce<Array<User>>((acc, user) => {
    const friends = includes(rootUsers, user.id) ? rootFriendIds : rootUsers;
    acc.push({ ...user, friends });
    return acc;
  }, []);
};
