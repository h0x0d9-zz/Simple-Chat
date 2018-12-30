import React from 'react';
import connect from '../connect';
import {
  getMessageAddingState,
  getChannelAddingState,
  getChannelRemovingState,
  getChannelRenamingState,
  getErrors,
} from '../selectors';

const AlertTypes = {
  addMessage: getMessageAddingState,
  addChannel: getChannelAddingState,
  removeChannel: getChannelRemovingState,
  renameChannel: getChannelRenamingState,
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
