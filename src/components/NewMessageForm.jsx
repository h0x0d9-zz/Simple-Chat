import React from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import connect from '../connect';
import { getCurrentChannelId, getMessageAddingState } from '../selectors';


const mapStateToProps = (state) => {
  const props = {
    currentChannelId: getCurrentChannelId(state),
    messageAddingState: getMessageAddingState(state),
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({
  form: 'newMessage',
  onSubmitSuccess: (...args) => {
    const [, , props] = args;
    props.reset();
  },
})
class NewMessageForm extends React.Component {
  sendMessage = ({ text }) => {
    const { currentChannelId, sendMessage } = this.props;
    return sendMessage(_.escape(text), currentChannelId);
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="row align-items-end">
        <div className="col-12">
          <form
            onSubmit={handleSubmit(this.sendMessage)}
            className="input-group input-group-lg"
          >
            <Field
              name="text"
              required
              disabled={submitting}
              component="input"
              type="text"
              className="form-control"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default NewMessageForm;
