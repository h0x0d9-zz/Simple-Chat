import { createSelector } from 'reselect';

const getChannels = state => state.channels;

export const channelsSelector = createSelector(
  getChannels,
  data => Object.values(data),
);

export const getCurrentChannelId = state => state.currentChannel.id;
