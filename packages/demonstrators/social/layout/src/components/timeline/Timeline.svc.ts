import { factories, Types } from '@demonstrators-social/data';
import { actions, TimelineActions } from '@demonstrators-social/shared';
import { Dispatch } from 'react';
import { v4 as uuidv4 } from 'uuid';

const { contentFactory, currentTimeStampFactory } = factories;
export const handleCreatePost = async (
  owner: Types.User,
  text: string,
  dispatch: Dispatch<TimelineActions>,
  callback: (value: Types.Post) => void
) => {
  const content: Types.Content = {
    ...(await contentFactory.combine(currentTimeStampFactory).build()),
    text
  };

  const post: Types.Post = {
    id: uuidv4(),
    author: owner,
    content,
    comments: [],
    votes: []
  };
  dispatch(actions.timeline.createPost(post));
  callback(post);
};
