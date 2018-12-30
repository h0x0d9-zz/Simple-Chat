import React from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import connect from '../connect';
import { getCurrentChannelId } from '../selectors';
import UserContext from '../context/userContext';


const mapStateToProps = (state) => {
  const props = {
    currentChannelId: getCurrentChannelId(state),
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
  static contextType = UserContext;

  sendMessage = author => ({ text }) => {
    const { currentChannelId, sendMessage } = this.props;
    return sendMessage(text, author, currentChannelId);
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <UserContext.Consumer>
        {
          username => (
            <div className="row align-items-end">
              <div className="col-12">
                <form
                  onSubmit={handleSubmit(this.sendMessage(username))}
                  className="input-group input-group-lg"
                >
                  <Field
                    name="text"
                    required
                    disabled={submitting}
                    component="input"
                    type="text"
                    className="form-control"
                    autoComplete="off"
                  />
                </form>
              </div>
            </div>
          )
        }
      </UserContext.Consumer>
    );
  }
}


export default NewMessageForm;
