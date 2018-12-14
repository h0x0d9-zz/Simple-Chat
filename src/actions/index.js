import { createAction } from 'redux-actions';
import axios from 'axios';
import cookies from 'js-cookie';
import routes from '../routes';
import debug from '../../lib/logger';


const log = debug('actions');

export const addChannels = createAction('CHANNELS_ADD');

export const setCurrentChannel = createAction('CURRENT_CHANNEL_SET');

export const addMessages = createAction('MESSAGES_ADD');

export const addMessage = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const sendMessage = (text, channelId) => async (dispatch) => {
  log('calling ACTION sendMessage with %o, %o params', text, channelId);

  try {
    const data = {
      attributes: {
        author: cookies.get('name'),
        text,
        time: new Date(),
      },
    };

    const resp = await axios.post(routes.messages(channelId), { data });
    log('sending message query result {%o}', resp.status);
  } catch (e) {
    log('caught error %o on sending message', e);
    dispatch(addMessageFailure(e));
  }
};
