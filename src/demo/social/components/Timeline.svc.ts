import { Dispatch } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TimelineActions } from '../../../../docs/src/modules/redux/features/actionType';
import { createPost } from '../../../../docs/src/modules/redux/features/timeline/actions';
import { factories } from '../../../data/social';
import { Content, Post, User } from '../../../typings/social';

const { contentFactory, currentTimeStampFactory } = factories;

export const handleCreatePost = async (
  owner: User,
  text: string,
  dispatch: Dispatch<TimelineActions>,
  callback: (value: Post) => void
) => {
  const content: Content = {
    ...(await contentFactory.combine(currentTimeStampFactory).build()),
    text
  };

  const post: Post = {
    id: uuidv4(),
    author: owner,
    content,
    comments: [],
    votes: []
  };
  dispatch(createPost(post));
  callback(post);
};
