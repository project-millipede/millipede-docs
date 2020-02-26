import { TimelineActions } from 'docs/src/modules/redux/features/actionType';
import { v4 as uuidv4 } from 'uuid';

import { createComment, removePost } from '../../../../docs/src/modules/redux/features/timeline/actions';
import { factories, schema } from '../../../data/social';
import { Comment } from '../../../typings/social';
import { UseCaseEntities } from '../../../typings/social/schema';

const { contentFactory, currentTimeStampFactory } = factories;
const { denormalizeWrapper, timelineSchema } = schema;

export const handleCreateComment = (
  timelineId: number,
  postId: number,
  text: string,
  entities: Partial<UseCaseEntities>,
  dispatch: React.Dispatch<TimelineActions>,
  callback: () => void = () => ({})
) => {
  const denormalizedTimeline = denormalizeWrapper(
    timelineId,
    timelineSchema,
    entities
  );

  const commentTemplate: Comment = {
    id: uuidv4(),

    commenter: { id: -1 },
    content: contentFactory.combine(currentTimeStampFactory).build()
  };

  const comment: Comment = {
    ...commentTemplate,
    commenter: denormalizedTimeline.owner,
    content: {
      ...commentTemplate.content,
      text
    }
  };

  dispatch(createComment(postId, comment));
  callback();
};

export const handleDeletePost = (
  timelineId: number,
  postId: number,
  dispatch: React.Dispatch<TimelineActions>,
  callback: () => void = () => ({})
) => {
  dispatch(removePost(timelineId, postId));
  callback();
};
