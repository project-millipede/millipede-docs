import { UseCaseEntities } from '../../../../../../src/typings/social';
import { insertAtWithPreserve } from '../../../utils/collection/array';
import { StoreAction } from '../actionType';
import { ADD_COMMENT, ADD_POST, NORMALIZE_DATA } from './actionTypes';

interface Props {
  entities: UseCaseEntities;
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

const timelineReducer = (state = initialState, action: StoreAction) => {
  switch (action.type) {
    case NORMALIZE_DATA:
      return {
        ...state,
        ...action.payload
      };
    case ADD_POST: {
      const {
        timelineId,
        post: { result, entities }
      } = action.payload;
      const post = entities.posts[result];

      return {
        ...state,
        entities: {
          ...state.entities,
          posts: {
            ...state.entities.posts,
            [result]: post
          },
          timelines: {
            ...state.entities.timelines,
            timelineId: {
              ...state.entities.timelines[timelineId],
              // posts: arrayInsert(
              //   state.entities.timelines[timelineId].posts,
              //   result,
              //   state.entities.timelines[timelineId].posts.length
              // )
              posts: insertAtWithPreserve(
                state.entities.timelines[timelineId].posts,
                result,
                0
              )
            }
          }
        }
      };
    }
    case ADD_COMMENT:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default timelineReducer;
