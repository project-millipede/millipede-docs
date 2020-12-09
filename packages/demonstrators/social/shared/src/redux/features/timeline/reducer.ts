import { CollectionUtil } from '@app/utils';
import { Entities } from '@demonstrators-social/data';
import produce from 'immer';

import { StoreAction } from '../actionType';
import { ADD_COMMENT, ADD_POST, DELETE_POST, NORMALIZE_DATA } from './actionTypes';

export interface TimelineProps {
  entities: Entities;
  result: string;
}

const initialState: TimelineProps = {
  entities: {
    usecases: {},
    users: {},
    timelines: {},
    posts: {},
    comments: {},
    votes: {}
  },
  result: ''
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
          post: { result, entities }
        } = action.payload;

        const post = entities.posts[result];
        draftState.entities.posts[result] = post;
        break;
      }

      // case DELETE_POST: {
      //   const { timelineId, postId } = action.payload;

      //   draftState.entities.posts = CollectionUtil.Object.removePropertyFromObject(
      //     state.entities.posts,
      //     postId
      //   );

      //   const postIndex = state.entities.timelines[timelineId].posts.findIndex(
      //     post => post === postId
      //   );

      //   draftState.entities.timelines[
      //     timelineId
      //   ].posts = CollectionUtil.Array.omitAtIndex(
      //     state.entities.timelines[timelineId].posts,
      //     postIndex
      //   );

      //   break;
      // }
      case DELETE_POST: {
        const { postId } = action.payload;

        draftState.entities.posts = CollectionUtil.Object.removePropertyFromObject(
          state.entities.posts,
          postId
        );

        // const postIndex = state.entities.timelines[timelineId].posts.findIndex(
        //   post => post === postId
        // );

        // draftState.entities.timelines[
        //   timelineId
        // ].posts = CollectionUtil.Array.omitAtIndex(
        //   state.entities.timelines[timelineId].posts,
        //   postIndex
        // );

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
