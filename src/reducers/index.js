import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import _ from 'lodash';

import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannels](state, { payload }) {
    return _.keyBy(payload, ch => ch.id);
  },
}, {});

const currentChannel = handleActions({
  [actions.setCurrentChannel](state, { payload: { id } }) {
    return { id };
  },
}, 1);

export default combineReducers({
  channels,
  currentChannel,
});
