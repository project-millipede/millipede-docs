import { atomFamily } from 'recoil';

export const postIdsState = atomFamily<Array<string>, string>({
  key: 'postIds',
  default: []
});
