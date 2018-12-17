import React from 'react';
import connect from '../connect';
import { getMessageAddingState } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    sendingMessageError: getMessageAddingState(state),
  };
  return props;
};

export default @connect(mapStateToProps)
class Alert extends React.Component {
  renderAllert = text => (
    <div className="row align-items-end">
      <div className="col-12">
        <div className="alert alert-warning" role="alert">{text}</div>
      </div>
    </div>
  );

  render() {
    const { sendingMessageError } = this.props;
    const isMessageSendingFailed = !!sendingMessageError;
    return isMessageSendingFailed
      ? this.renderAllert('Slack couldn’t send this message. Try again')
      : null;
  }
}
