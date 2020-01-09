import produce from 'immer';

import { Timeline, UseCaseEntities } from '../../../../../../src/typings/social';
import { arrayInsert, insertAtWithPreserve } from '../../../utils/collection/array';
import { StoreAction } from '../actionType';
import { ADD_COMMENT, ADD_POST, NORMALIZE_DATA } from './actionTypes';

export type TimelineMap = Record<string, Timeline>;

interface Props {
  timelines?: TimelineMap;
  entities: Partial<UseCaseEntities>;
  result: number;
}

const initialState: Props = {
  entities: {
    usecases: {},
    users: {},
    timelines: {},
    posts: {},
    comments: {},
    votes: {}
  },
  result: 0
};

const timelineReducer = (state = initialState, action: StoreAction) =>
  produce(state, draftState => {
    switch (action.type) {
      case NORMALIZE_DATA: {
        draftState.entities = action.payload.entities;
        draftState.result = action.payload.result;
        break;
      }
      case ADD_POST: {
        const {
          timelineId,
          post: { result, entities }
        } = action.payload;

        const post = entities.posts[result];
        draftState.entities.posts[result] = post;
        // draftState.entities.timelines[timelineId].posts = insertAtWithPreserve(
        //   state.entities.timelines[timelineId].posts,
        //   result,
        //   0
        // );
        draftState.entities.timelines[timelineId].posts = arrayInsert(
          state.entities.timelines[timelineId].posts,
          result,
          state.entities.timelines[timelineId].posts.length
        );
        break;
      }
      case ADD_COMMENT: {
        const {
          postId,
          comment: { result, entities }
        } = action.payload;

        const comment = entities.comments[result];
        draftState.entities.comments[result] = comment;
        draftState.entities.posts[postId].comments = insertAtWithPreserve(
          state.entities.posts[postId].comments,
          result,
          0
        );
        break;
      }
      default:
        break;
    }
  });

export default timelineReducer;
