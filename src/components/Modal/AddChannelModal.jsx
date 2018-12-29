import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import Alert from '../Alert';
import connect from '../../connect';
import { ajaxRequestsSelector } from '../../selectors';


const mapStateToProps = (state) => {
  const props = {
    addingState: ajaxRequestsSelector(state).removeChannel,
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({
  form: 'addNewChannel',
  onSubmitSuccess: (...args) => {
    const [, , props] = args;
    props.reset();
  },
})
class AddChannelModal extends React.Component {
  addChannel = ({ channelName }) => {
    const { addChannel } = this.props;
    return addChannel(channelName);
  }

  render() {
    const {
      submitting,
      pristine,
      handleSubmit,
      hideModal,
    } = this.props;

    return (
      <>
        <Modal show onHide={hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add new channel</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit(this.addChannel)}>
            <Modal.Body>
              <p>Enter channel name:</p>
              <Field
                name="channelName"
                required
                component="input"
                type="text"
                className="form-control"
                autoComplete="off"
              />
              <Alert type="addChannel" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={hideModal}>Cancel</Button>
              <Button
                type="submit"
                variant="primary"
                disabled={pristine || submitting}
              >
                Complete
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
}

export default AddChannelModal;
