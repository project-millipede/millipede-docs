import { atomFamily } from 'recoil';

import { RefPostScrollMap } from './types';

export const postIdsState = atomFamily<Array<string>, string>({
  key: 'post-ids',
  default: []
});

// key corresponds to postId
export const refPostScrollState = atomFamily<RefPostScrollMap, string>({
  key: 'ref-post-scroll',
  default: {}
});
