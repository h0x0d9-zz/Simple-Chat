import { createSelector } from 'reselect';

const getChannels = state => state.channels;

export default createSelector(
  getChannels,
  data => Object.values(data),
);
