import { createSelector } from 'reselect';


const getChannels = state => state.channels;
const getMessages = state => state.messages;

export const getCurrentChannelId = state => state.currentChannel.id;

export const channelsSelector = createSelector(
  getChannels,
  data => Object.values(data),
);

export const messagesSelector = createSelector(
  getMessages,
  getCurrentChannelId,
  (messages, channelId) => Object.values(messages)
    .filter(m => m.channelId === channelId),
);

export const getMessageAddingState = state => state.errors.addMessageFailure;
