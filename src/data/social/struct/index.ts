import _ from 'lodash';

import { User } from '../../../typings/social';

export const createFriendships = (
  users: Array<User>,
  rootUsers: Array<string>
) => {
  const allFriendIds = users.map(u => u.id);
  const rootFriendIds = _.without(allFriendIds, ...rootUsers);

  return users.reduce<Array<User>>((acc, user) => {
    const friends = _.includes(rootUsers, user.id) ? rootFriendIds : rootUsers;
    acc.push({ ...user, friends });
    return acc;
  }, []);
};
