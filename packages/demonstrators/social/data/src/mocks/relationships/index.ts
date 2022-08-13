import { User } from '../../types';

/**
 * The function "without" currenlty can not be embedded in the package @app/utils.
 * Somehow the test execution collides, maybe because of the reason the array test-suite executes before the relation test-suite.
 */

/**
 * @param arr The array to inspect.
 * @param values The values to exclude.
 * @returns Returns a new array of filtered values.
 */
export const without = <T>(arr: Array<T>, values: Array<T>): Array<T> => {
  return arr.filter(item => !values.includes(item));
};

export const createFriendships = (
  users: Array<User>,
  rootUsers: Array<string>
) => {
  const allFriendIds = users.map(u => u.id);
  const rootFriendIds = without(allFriendIds, rootUsers);
  return users.reduce<Array<User>>((acc, user) => {
    const friends = rootUsers.includes(user.id) ? rootFriendIds : rootUsers;
    acc.push({ ...user, friends });
    return acc;
  }, []);
};
