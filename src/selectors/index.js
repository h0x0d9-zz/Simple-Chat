import { createSelector } from 'reselect';


export const getCurrentChannelId = state => state.currentChannel.id;

const getChannels = state => state.channels;

export const channelsSelector = createSelector(
  getChannels,
  data => Object.values(data),
);

const getMessages = state => state.messages;

export const messagesSelector = createSelector(
  getMessages,
  getCurrentChannelId,
  (messages, channelId) => Object.values(messages)
    .filter(m => m.channelId === channelId),
);

export const ajaxRequestsSelector = (state) => {
  const {
    messageAddingState,
    channelAddingState,
    channelRemovingState,
    channelRenamingState,
  } = state;

  return {
    addMessage: messageAddingState,
    addChannel: channelAddingState,
    removeChannel: channelRemovingState,
    renameChannel: channelRenamingState,
  };
};

export const getErrors = state => state.errors;

export const getModalState = state => state.modal;
