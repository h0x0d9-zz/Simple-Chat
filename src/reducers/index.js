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

const channelAddingState = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelSuccess]() {
    return 'successed';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
  [actions.hideModal]() {
    return 'none';
  },
}, 'none');

const channelRemovingState = handleActions({
  [actions.removeChannelRequest]() {
    return 'requested';
  },
  [actions.removeChannelSuccess]() {
    return 'successed';
  },
  [actions.removeChannelFailure]() {
    return 'failed';
  },
  [actions.hideModal]() {
    return 'none';
  },
}, 'none');

const channelRenamingState = handleActions({
  [actions.renameChannelRequest]() {
    return 'requested';
  },
  [actions.renameChannelSuccess]() {
    return 'successed';
  },
  [actions.renameChannelFailure]() {
    return 'failed';
  },
  [actions.hideModal]() {
    return 'none';
  },
}, 'none');

const errors = handleActions({
  [actions.addMessageFailure](state, { payload }) {
    return { ...state, addMessage: payload };
  },
  [actions.addMessageRequest](state) {
    return _.omit(state, 'addMessage');
  },
  [actions.addChannelFailure](state, { payload }) {
    return { ...state, addChannel: payload };
  },
  [actions.addChannelRequest](state) {
    return _.omit(state, 'addChannel');
  },
  [actions.removeChannelFailure](state, { payload }) {
    return { ...state, removeChannel: payload };
  },
  [actions.removeChannelRequest](state) {
    return _.omit(state, 'removeChannel');
  },
  [actions.renameChannelFailure](state, { payload }) {
    return { ...state, renameChannel: payload };
  },
  [actions.renameChannelRequest](state) {
    return _.omit(state, 'renameChannel');
  },
}, {});

const modal = handleActions({
  [actions.showModal](state, { payload: { modalType, modalProps } }) {
    return {
      modalType,
      modalProps,
    };
  },
  [actions.hideModal]() {
    return {
      modalType: null,
      modalProps: {},
    };
  },
  [actions.addChannelSuccess]() {
    return {
      modalType: null,
      modalProps: {},
    };
  },
  [actions.removeChannelSuccess]() {
    return {
      modalType: null,
      modalProps: {},
    };
  },
  [actions.renameChannelSuccess]() {
    return {
      modalType: null,
      modalProps: {},
    };
  },
},
{
  modalType: null,
  modalProps: {},
});


export default combineReducers({
  form: formReducer,
  channels,
  messages,
  messageAddingState,
  channelAddingState,
  channelRemovingState,
  channelRenamingState,
  errors,
  modal,
  currentChannel,
});
