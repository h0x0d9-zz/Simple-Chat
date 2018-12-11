import React from 'react';
import connect from '../connect';
import { messagesSelector } from '../selectors';


const Message = ({ message }) => (
  <div className="row align-items-start">
    <div className="col-12">
      <div className="row">
        <div className="col-12">
          <b>{message.author}</b>
          <span className="font-weight-light small mx-2">{message.time}</span>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-12">{message.text}</div>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => {
  const props = {
    messages: messagesSelector(state),
  };

  return props;
};

export default @connect(mapStateToProps)
class MessagesList extends React.Component {
  render() {
    const { messages } = this.props;
    return messages.map(m => <Message key={m.id} message={m} />);
  }
}
