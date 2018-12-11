import { createAction } from 'redux-actions';
import axios from 'axios';
import cookies from 'js-cookie';
import routes from '../routes';
import debug from '../../lib/logger';


const log = debug('actions');

export const addChannels = createAction('CHANNELS_ADD');

export const setCurrentChannel = createAction('CURRENT_CHANNEL_SET');

export const addMessages = createAction('MESSAGES_ADD');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = (text, channelId) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const data = {
      attributes: {
        author: cookies.get('name'),
        text,
        time: new Date(),
      },
    };

    const response = await axios.post(routes.messages(channelId), { data });
    log(response);
    const { id, attributes } = response.data.data;
    dispatch(addMessageSuccess({ id, ...attributes }));
  } catch (e) {
    dispatch(addMessageFailure(e));
  }
};
