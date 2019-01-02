import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';


const GENERAL_CHANNEL_ID = 1;

const channels = handleActions({
  [actions.addChannels](state, { payload }) {
    return _.keyBy(payload, ch => ch.id);
  },
  [actions.addChannelSuccess](state, { payload }) {
    return { ...state, [payload.id]: payload };
  },
  [actions.removeChannelSuccess](state, { payload }) {
    return _.omit(state, payload.id);
  },
  [actions.renameChannelSuccess](state, { payload: { id, name } }) {
    return ({ ...state, [id]: { ...state[id], name } });
  },
}, {});

const currentChannel = handleActions({
  [actions.setCurrentChannel](state, { payload: { id } }) {
    return { id };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    return state.id === id ? { id: GENERAL_CHANNEL_ID } : state;
  },
}, { id: GENERAL_CHANNEL_ID });

const messages = handleActions({
  [actions.addMessages](state, { payload }) {
    return _.keyBy(payload, m => m.id);
  },
  [actions.addMessageSuccess](state, { payload }) {
    return { ...state, [payload.id]: payload };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    return _.pickBy(state, ({ channelId }) => channelId !== id);
  },
}, {});

const messageAddingState = handleActions({
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageSuccess]() {
    return 'successed';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
}, 'none');

const channelControllingState = handleActions({
  [actions.controlChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelSuccess]() {
    return 'successed';
  },
  [actions.renameChannelSuccess]() {
    return 'successed';
  },
  [actions.removeChannelSuccess]() {
    return 'successed';
  },
  [actions.controlChannelFailure]() {
    return 'failed';
  },
  [actions.hideModal]() {
    return 'none';
  },
}, 'none');

const errors = handleActions({
  [actions.addMessageFailure](state, { payload }) {
    return { ...state, message: payload };
  },
  [actions.addMessageRequest](state) {
    return _.omit(state, 'message');
  },
  [actions.controlChannelFailure](state, { payload }) {
    return { ...state, channel: payload };
  },
  [actions.controlChannelRequest](state) {
    return _.omit(state, 'channel');
  },
}, {});

const initialModalState = {
  modalType: null,
  modalProps: {},
};

const modal = handleActions({
  [actions.showModal](state, { payload: { modalType, modalProps } }) {
    return {
      modalType,
      modalProps,
    };
  },
  [actions.hideModal]() {
    return initialModalState;
  },
  [actions.addChannelSuccess]() {
    return initialModalState;
  },
  [actions.renameChannelSuccess]() {
    return initialModalState;
  },
  [actions.removeChannelSuccess]() {
    return initialModalState;
  },
},
initialModalState);


export default combineReducers({
  form: formReducer,
  channels,
  messages,
  messageAddingState,
  channelControllingState,
  errors,
  modal,
  currentChannel,
});
