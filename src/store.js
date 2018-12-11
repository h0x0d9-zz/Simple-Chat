import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import * as actions from './actions';


export default ({ channels, currentChannelId, messages }) => {
  /* eslint-disable no-underscore-dangle */
  const ext = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  /* eslint-enable */
  const composeEnhancers = ext || compose;

  const store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(thunk),
    ),
  );

  store.dispatch(actions.addChannels(channels));
  store.dispatch(actions.setCurrentChannel({ id: currentChannelId }));
  store.dispatch(actions.addMessages(messages));

  return store;
};
