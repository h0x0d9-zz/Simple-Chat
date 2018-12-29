import React from 'react';
import connect from '../../connect';
import { getModalState } from '../../selectors';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';


export const MODAL_COMPONENTS = {
  ADD_CHANNEL: AddChannelModal,
  REMOVE_CHANNEL: RemoveChannelModal,
  RENAME_CHANNEL: RenameChannelModal,
};

const mapStateToProps = state => ({ modalState: getModalState(state) });

export default @connect(mapStateToProps)
class ModalRoot extends React.Component {
  render() {
    const { modalState: { modalType, modalProps } } = this.props;

    if (!modalType) {
      return null;
    }

    const SpecificModal = MODAL_COMPONENTS[modalType];
    return (<SpecificModal {...modalProps} />);
  }
}
