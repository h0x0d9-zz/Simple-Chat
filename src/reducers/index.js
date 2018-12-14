import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';


const channels = handleActions({
  [actions.addChannels](state, { payload }) {
    return _.keyBy(payload, ch => ch.id);
  },
}, {});

const currentChannel = handleActions({
  [actions.setCurrentChannel](state, { payload: { id } }) {
    console.log(id);
    return { id };
  },
}, 1);

const messages = handleActions({
  [actions.addMessages](state, { payload }) {
    return _.keyBy(payload, m => m.id);
  },
  [actions.addMessageSuccess](state, { payload }) {
    return { ...state, [payload.id]: payload };
  },
}, {});

const messageAddingState = handleActions({
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
  [actions.addMessageSuccess]() {
    return 'successed';
  },
}, 'none');

export default combineReducers({
  form: formReducer,
  channels,
  messages,
  messageAddingState,
  currentChannel,
});
