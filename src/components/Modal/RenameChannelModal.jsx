import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import Alert from '../Alert';
import connect from '../../connect';
import { getChannelRenamingState } from '../../selectors';


const mapStateToProps = (state) => {
  const props = {
    renamingState: getChannelRenamingState(state),
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({
  form: 'renameChannel',
})
class RenameChannelModal extends React.Component {
  renameChannel = ({ channelName }) => {
    const { renameChannel, id } = this.props;
    return renameChannel(id, channelName);
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
            <Modal.Title>Rename channel</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit(this.renameChannel)}>
            <Modal.Body>
              <p>Enter new channel name:</p>
              <Field
                name="channelName"
                required
                component="input"
                type="text"
                className="form-control"
                autoComplete="off"
              />
              <Alert type="renameChannel" />
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

export default RenameChannelModal;
