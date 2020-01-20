import produce from 'immer';

import { CollectionUtil } from '../../../utils';

import { Timeline } from '../../../../../../src/typings/social';
import { StoreAction } from '../actionType';

import { UseCaseEntities } from '../../../../../../src/typings/social/schema';

import {
  ADD_COMMENT,
  ADD_POST,
  NORMALIZE_DATA,
  DELETE_POST
} from './actionTypes';

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
        draftState.entities.timelines[
          timelineId
        ].posts = CollectionUtil.Array.insertAtWithPreserve(
          state.entities.timelines[timelineId].posts,
          result,
          0
        );
        break;
      }
      case DELETE_POST: {
        const { timelineId, postId } = action.payload;

        draftState.entities.posts = CollectionUtil.Object.removePropertyFromObject(
          state.entities.posts,
          postId
        );

        const postIndex = state.entities.timelines[timelineId].posts.findIndex(
          post => post === postId
        );

        draftState.entities.timelines[
          timelineId
        ].posts = CollectionUtil.Array.omitAtIndex(
          state.entities.timelines[timelineId].posts,
          postIndex
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
        draftState.entities.posts[
          postId
        ].comments = CollectionUtil.Array.insertAtWithPreserve(
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
