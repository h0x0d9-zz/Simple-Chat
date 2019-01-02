import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';
import debug from '../../lib/logger';


const log = debug('actions');

export const showModal = createAction('MODAL_SHOW');
export const hideModal = createAction('MODAL_HIDE');

export const addChannels = createAction('CHANNELS_ADD');
export const addMessages = createAction('MESSAGES_ADD');
export const setCurrentChannel = createAction('CURRENT_CHANNEL_SET');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const sendMessage = (text, author, channelId) => async (dispatch) => {
  log('calling ACTION sendMessage with %o, %o params', text, author, channelId);
  dispatch(addMessageRequest());
  try {
    const data = {
      attributes: {
        author,
        text,
        time: new Date(),
      },
    };

    const resp = await axios.post(routes.messages(channelId), { data });
    log('sending message query result {%o}', resp.status);
  } catch (e) {
    log('caught error %o on sending message', e);
    dispatch(addMessageFailure('Slack couldn’t send this message. Try again'));
  }
};

export const controlChannelRequest = createAction('CHANNEL_CONTROL_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const controlChannelFailure = createAction('CHANNEL_CONTROL_FAILURE');

export const addChannel = channelName => async (dispatch) => {
  log('calling ACTION addChannel with %o param', channelName);
  dispatch(controlChannelRequest());
  try {
    const data = {
      attributes: {
        name: channelName,
      },
    };

    const resp = await axios.post(routes.channels(), { data });
    log('sending message query result {%o}', resp.status);
  } catch (e) {
    log('caught error %o ', e.message);
    dispatch(controlChannelFailure('Slack couldn\'t add this channel. Try again'));
  }
};

export const removeChannel = id => async (dispatch) => {
  log('calling ACTION removeChannel with %o param', id);
  dispatch(controlChannelRequest());
  try {
    const resp = await axios.delete(routes.channel(id));
    log('deleting channel query result {%o}', resp.status);
  } catch (e) {
    log('caught error %o', e.message);
    dispatch(controlChannelFailure('Slack couldn\'t remove this channel. Try again'));
  }
};

export const renameChannel = (id, name) => async (dispatch) => {
  log('calling ACTION renameChannel with %o param', id, name);
  dispatch(controlChannelRequest());
  try {
    const data = {
      attributes: {
        name,
      },
    };
    const resp = await axios.patch(routes.channel(id), { data });
    log('rennaming channel query result {%o}', resp.status);
  } catch (e) {
    log('caught error %o', e.message);
    dispatch(controlChannelFailure('Slack couldn\'t rename this channel. Try again'));
  }
};
