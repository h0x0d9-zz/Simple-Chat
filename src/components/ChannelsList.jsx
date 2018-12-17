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

  render() {
    const { channels, currentChannelId } = this.props;

    return (
      <ul className="nav flex-column nav-pills nav-fill">
        {
          channels.map((ch) => {
            const { id, name } = ch;

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
                    <div className="btn-group" role="group" aria-label="Channel Control">
                      <button type="button" className="btn-link btn btn-sm">
                        <i className="far fa-edit" />
                      </button>
                      <button type="button" disabled className="btn-link btn btn-sm">
                        <i className="far fa-trash-alt" />
                      </button>
                    </div>
                  </div>
                </div>

              </li>
            );
          })
        }
        <li className="nav-item">
          <div className="row">
            <div className="col-9">
              <a href="#editChannel" className="nav-link">
                Add channel
              </a>
            </div>
            <div className="col-3  mt-1">
              <button type="button" className="btn-link btn btn-sm">
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>

        </li>
      </ul>
    );
  }
}
