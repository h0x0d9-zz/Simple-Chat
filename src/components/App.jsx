import React from 'react';
import ChannelsList from './ChannelsList';
import NewMessageForm from './NewMessageForm';
import MessagesList from './MessagesList';
import Alert from './Alert';


export default class App extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-4 col-xl-3 mb-2">
          <nav className="navbar navbar-expand-lg navbar-light bg-light flex-lg-column">
            <a className="navbar-brand" href="./">Channels</a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#channelsNavbarToggler"
              aria-controls="channelsNavbarToggler"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="channelsNavbarToggler">
              <ChannelsList />
            </div>
          </nav>
        </div>
        <div className="col-lg-8 col-xl-9">
          <MessagesList />
          <Alert/>
          <NewMessageForm />
        </div>
      </div>
    );
  }
}
