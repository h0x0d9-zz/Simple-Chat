import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../assets/application.css';
import faker from 'faker';
import cookies from 'js-cookie';
import gon from 'gon';
import io from 'socket.io-client';
import initApp from './app';
import createStore from './store';
import * as actions from './actions';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const username = cookies.get('name') || faker.name.findName();
cookies.set('name', username);

const store = createStore(gon);

const socket = io();
socket.on(
  'newMessage',
  ({ data: { attributes } }) => store.dispatch(actions.addMessageSuccess(attributes))
);

socket.on(
  'newChannel',
  ({ data: { attributes } }) => store.dispatch(actions.addChannelSuccess(attributes)),
);

socket.on(
  'removeChannel',
  ({ data }) => store.dispatch(actions.removeChannelSuccess(data)),
);

socket.on(
  'renameChannel',
  ({ data: { attributes } }) => store.dispatch(actions.renameChannelSuccess(attributes)),
);

initApp(username, store);
