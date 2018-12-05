import { createAction } from 'redux-actions';

export const addChannels = createAction('CHANNELS_ADD');
export const addChannel = createAction('CHANNEL_ADD');
export const setCurrentChannel = createAction('CURRENT_CHANNEL_SET');
