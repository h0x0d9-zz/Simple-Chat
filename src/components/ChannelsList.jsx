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
      <ul className="nav flex-column nav-pills">
        {
          channels.map((ch) => {
            const { id, name } = ch;

            const className = cn({
              'nav-link': true,
              active: id === currentChannelId,
            });

            return (
              <li className="nav-item" key={id}>
                <a href={name} className={className} onClick={this.handleChannelChoice(id)}>
                  #
                  {' '}
                  {name}
                </a>
              </li>
            );
          })
        }
      </ul>
    );
  }
}
