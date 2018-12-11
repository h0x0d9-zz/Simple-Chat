import React from 'react';
import connect from '../connect';
import { getMessageAddingState } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    messageAddingState: getMessageAddingState(state),
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
    const { messageAddingState } = this.props;
    const messageSendingFailed = messageAddingState === 'failed';
    return messageSendingFailed
      ? this.renderAllert('Slack couldn’t send this message. Try again')
      : null;
  }
}
