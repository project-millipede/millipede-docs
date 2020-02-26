import { v4 as uuidv4 } from 'uuid';

import { TimelineActions } from '../../../../docs/src/modules/redux/features/actionType';
import { createPost } from '../../../../docs/src/modules/redux/features/timeline/actions';
import { factories, schema } from '../../../data/social';
import { Post } from '../../../typings/social';
import { UseCaseEntities } from '../../../typings/social/schema';

const { contentFactory, currentTimeStampFactory, mediaFactory } = factories;
const { denormalizeWrapper, timelineSchema } = schema;
export const handleCreatePost = (
  timelineId: number,
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

  const postTemplate: Post = {
    id: uuidv4(),

    author: { id: -1 },

    content: contentFactory.combine(currentTimeStampFactory).build(),
    comments: [],
    votes: []
  };

  const post: Post = {
    ...postTemplate,
    author: denormalizedTimeline.owner,
    content: {
      ...postTemplate.content,
      text,
      media: mediaFactory.build()
    }
  };

  dispatch(createPost(timelineId, post));
  callback();
};
