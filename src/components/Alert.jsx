import React from 'react';
import connect from '../connect';
import {
  getMessageAddingState,
  getChannelControllingState,
  getErrors,
} from '../selectors';

const AlertTypes = {
  message: getMessageAddingState,
  channel: getChannelControllingState,
};

const mapStateToProps = (state, { type }) => {
  const props = {
    show: AlertTypes[type](state) === 'failed',
    error: getErrors(state)[type],
  };
  return props;
};

export default @connect(mapStateToProps)
class Alert extends React.Component {
  renderAllert = text => (
    <div className="alert alert-warning my-2" role="alert">{text}</div>
  );

  render() {
    const { show, error } = this.props;
    return show
      ? this.renderAllert(error)
      : null;
  }
}
