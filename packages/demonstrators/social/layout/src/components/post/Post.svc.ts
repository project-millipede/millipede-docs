import { factories, Types } from '@demonstrators-social/data';
import { features, Timeline } from '@demonstrators-social/shared';
import { SetterOrUpdater } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const { contentCommentFactory, currentTimeStampFactory } = factories;

export const handleCreateComment = async (
  owner: Types.User,
  postId: string,
  text: string,
  set: SetterOrUpdater<Timeline>,
  callback: (value: Types.Comment) => void
) => {
  const {
    timeline: {
      actions: { createComment }
    }
  } = features;

  const content: Types.Content = {
    ...(await contentCommentFactory.combine(currentTimeStampFactory).build()),
    text
  };

  const comment: Types.Comment = {
    id: uuidv4(),
    commenter: owner,
    content
  };

  createComment(set, postId, comment);
  callback(comment);
};

export const handleDeletePost = (
  timelineId: string,
  postId: string,
  set: SetterOrUpdater<Timeline>
) => {
  const {
    timeline: {
      actions: { removePost }
    }
  } = features;

  removePost(set, timelineId, postId);
};
