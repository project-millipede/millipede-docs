import { factories, Types } from '@demonstrators-social/data';
import { features, Timeline } from '@demonstrators-social/shared';
import { SetterOrUpdater } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const { contentFactory, currentTimeStampFactory } = factories;

export const handleCreatePost = async (
  owner: Types.User,
  text: string,
  set: SetterOrUpdater<Timeline>,
  callback: (value?: Types.Post) => void
) => {
  const {
    timeline: {
      actions: { createPost }
    }
  } = features;

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
  createPost(set, post);
  callback(post);
};
