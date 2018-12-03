import { createStore } from 'redux';

import reducers from './reducers';
import * as actions from './actions';


export default ({ channels }) => {
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  /* eslint-enable */

  store.dispatch(actions.addChannels(channels));

  return store;
};
