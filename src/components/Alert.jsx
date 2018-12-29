import React from 'react';
import connect from '../connect';
import { ajaxRequestsSelector, getErrors } from '../selectors';


const mapStateToProps = (state, { type }) => {
  const props = {
    show: ajaxRequestsSelector(state)[type] === 'failed',
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
