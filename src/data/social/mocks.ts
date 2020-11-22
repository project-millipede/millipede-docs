import { v4 as uuidv4 } from 'uuid';

import { takeNRandom } from '../../../docs/src/modules/utils/collection/array';
import { UseCase } from '../../typings/social';
import { postFactory, postFactoryRealtime, timelineFactory, userFactory } from './factories_chance';
import { createFriendships } from './struct';

export const contains = <T>(array: Array<T>) => (val: T) =>
  array.indexOf(val) !== -1;

export const generateData = async () => {
  const userListA = await userFactory.buildList(5);
  const userListB = await userFactory.buildList(4);

  const userListAToProcess = [...userListA, userListB[0]];
  const userListBToProcess = [...userListB, userListA[0]];

  const userIndicesToExcludeA = [0];
  const userIndicesToExcludeB = [0];

  const userGroupA1ToN = createFriendships(userListAToProcess, [
    userListAToProcess[0].id
  ]);
  const userGroupB1ToN = createFriendships(userListBToProcess, [
    userListBToProcess[0].id
  ]);

  const userIndicesToExcludeAFn = contains([
    ...userIndicesToExcludeA,
    userListAToProcess.length - 1
  ]);
  const userIndicesToExcludeBFn = contains([
    ...userIndicesToExcludeB,
    userListBToProcess.length - 1
  ]);

  const userGroupWithOutRootsA = userGroupA1ToN.filter((_user, index) => {
    return !userIndicesToExcludeAFn(index);
  });

  const userGroupWithOutRootsB = userGroupB1ToN.filter((_user, index) => {
    return !userIndicesToExcludeBFn(index);
  });

  const userGroupRootsA = userGroupA1ToN.filter((_user, index) => {
    return userIndicesToExcludeAFn(index);
  });

  const userGroupRootsB = userGroupB1ToN.filter((_user, index) => {
    return userIndicesToExcludeBFn(index);
  });

  const postsA = await postFactory.buildList(4);
  const postsB = await postFactory.buildList(3);

  const modifiedPostsA = postsA.map(post => {
    const [randomUser] = takeNRandom(userGroupWithOutRootsA, 1);
    return {
      ...post,
      author: randomUser
    };
  });

  const modifiedPostsB = postsB.map(post => {
    const [randomUser] = takeNRandom(userGroupWithOutRootsB, 1);
    return {
      ...post,
      author: randomUser
    };
  });

  const timelines = await timelineFactory.buildList(2);

  const postsAFromAuthor = await postFactoryRealtime.buildList(1);
  const postsBFromAuthor = await postFactoryRealtime.buildList(2);

  const modifiedPostsAFromAuthor = postsAFromAuthor.map(post => {
    return {
      ...post,
      author: userGroupRootsA[0]
    };
  });

  const modifiedPostsBFromAuthor = postsBFromAuthor.map(post => {
    return {
      ...post,
      author: userGroupRootsB[0]
    };
  });

  const modifiedTimelines = timelines.map((timeline, index) => {
    const selectedPosts =
      index === 0
        ? modifiedPostsA
            .map(post => post)
            .concat(modifiedPostsAFromAuthor.map(post => post))
        : modifiedPostsB
            .map(post => post)
            .concat(modifiedPostsBFromAuthor.map(post => post));

    return {
      ...timeline,
      owner: index === 0 ? userGroupRootsA[0] : userGroupRootsB[0],
      posts: selectedPosts
    };
  });

  const usecaseData: UseCase = {
    id: uuidv4(),
    timelines: modifiedTimelines
  };
  return usecaseData;
};
