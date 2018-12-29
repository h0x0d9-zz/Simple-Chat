import React from 'react';
import cn from 'classnames';
import connect from '../connect';
import { channelsSelector, getCurrentChannelId } from '../selectors';


const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
    currentChannelId: getCurrentChannelId(state),
  };
  return props;
};

export default @connect(mapStateToProps)
class ChannelsList extends React.Component {
  handleChannelChoice = id => (e) => {
    e.preventDefault();
    const { setCurrentChannel } = this.props;
    setCurrentChannel({ id });
  }

  handleShowRenameChannelModal = id => (e) => {
    e.preventDefault();
    const { showModal } = this.props;

    const modalType = 'RENAME_CHANNEL';
    const modalProps = { id };
    showModal({ modalType, modalProps });
  }

  handleShowRemoveChannelModal = id => (e) => {
    e.preventDefault();
    const { showModal } = this.props;

    const modalType = 'REMOVE_CHANNEL';
    const modalProps = { id };
    showModal({ modalType, modalProps });
  }

  handleShowAddChannelModal = (e) => {
    e.preventDefault();
    const { showModal } = this.props;

    const modalType = 'ADD_CHANNEL';
    showModal({ modalType });
  }

  renderChannelControls(channel) {
    const { id, removable } = channel;

    return (
      <div className="btn-group" role="group" aria-label="Channel Control">
        <button
          type="button"
          onClick={this.handleShowRenameChannelModal(id)}
          className="btn-link btn btn-sm"
        >
          <i className="far fa-edit" />
        </button>
        {
          removable ? (
            <button
              type="button"
              onClick={this.handleShowRemoveChannelModal(id)}
              disabled={!removable}
              className="btn-link btn btn-sm"
            >
              <i className="far fa-trash-alt" />
            </button>
          )
            : null
        }

      </div>
    );
  }

  render() {
    const { channels, currentChannelId } = this.props;

    return (
      <ul className="nav flex-column nav-pills nav-fill">
        {
          channels.map((ch) => {
            const { id, name, removable } = ch;

            const linkClassName = cn({
              'nav-link': true,
              active: id === currentChannelId,
            });

            return (
              <li className="nav-item" key={id}>
                <div className="row">
                  <div className="col-8">
                    <a href={name} className={linkClassName} onClick={this.handleChannelChoice(id)}>
                      #&nbsp;
                      {name}
                    </a>
                  </div>
                  <div className="col-4 mt-1">
                    {removable ? this.renderChannelControls(ch) : null}
                  </div>
                </div>

              </li>
            );
          })
        }
        <li className="nav-item">
          <div className="row">
            <div className="col-9">
              <a href="#addChannel" className="nav-link" onClick={this.handleShowAddChannelModal}>
                Add channel
              </a>
            </div>
            <div className="col-3  mt-1">
              <button type="button" className="btn-link btn btn-sm" onClick={this.handleShowAddChannelModal}>
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    );
  }
}
